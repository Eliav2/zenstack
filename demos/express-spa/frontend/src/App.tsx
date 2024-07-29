import './App.css';
import {
    useCheckPost,
    useCreatePost,
    useCreateUser,
    useDeletePost,
    useFindFirstUser,
    useFindManyPost,
    useUpdatePost,
} from '@express-spa-demo/backend/src/generated-hooks';
import { FieldApi, useForm } from '@tanstack/react-form';
import { useAppState } from './AppStateProvider.tsx';
import type { Post, User } from 'prisma-models';
import { useQueryClient } from '@tanstack/react-query';

type PostWithAuthor = Post & { author: User };

function App() {
    return (
        <>
            <div>zenstack demo</div>
            <CurrentUser />
            <Posts />
            <CreatePost />
        </>
    );
}

const CurrentUser = () => {
    const { currentUser, setCurrentUser } = useAppState();
    const queryClient = useQueryClient();
    const createUserQuery = useCreateUser();
    return (
        <>
            <label htmlFor={'currentUser'}>Current Authenticated User:</label>
            <input
                id={'currentUser'}
                name={'currentUser'}
                value={currentUser}
                onChange={(e) => {
                    setCurrentUser(e.target.value);
                }}
            />
            <button
                onClick={() => {
                    queryClient.invalidateQueries();
                    // createUserQuery.mutateAsync({ data: { username: currentUser } });
                }}
            >
                Update
            </button>
        </>
    );
};

const Posts = () => {
    const postsQuery = useFindManyPost({
        include: {
            author: { select: { username: true } },
        },
    });
    const posts = postsQuery.data || [];

    return (
        <div style={{ border: '1px solid grey', padding: 8, borderRadius: 8, marginBlock: 16 }}>
            <div
                style={{
                    color: 'grey',
                    fontSize: 12,
                    marginBottom: 8,
                }}
            >
                you can see only posts related to the current authenticated user
            </div>
            <h4>posts</h4>
            {postsQuery.isLoading ? (
                <div>Loading...</div>
            ) : (
                (posts.length === 0 && <span>No posts yet</span>) ||
                posts?.map((post) => <PostSection key={post.id} post={post} />)
            )}
        </div>
    );
};

const PostSection = ({ post }: { post: PostWithAuthor }) => {
    const { currentUser } = useAppState();
    const currentUserFromDbQuery = useFindFirstUser({ where: { username: currentUser } });
    const authorId = currentUserFromDbQuery.data?.id;
    console.log('authorId', currentUserFromDbQuery.data);
    const deletePostQuery = useDeletePost();
    const publishPostQuery = useUpdatePost();
    const userCanUpdateQuery = useCheckPost({ operation: 'update', where: { id: post.id, authorId: authorId } });
    const userCanDeleteQuery = useCheckPost({ operation: 'delete', where: { id: post.id, authorId: authorId } });
    console.log('userCanDeleteQuery', userCanDeleteQuery.data);
    const userCanUpdate = userCanUpdateQuery.data ?? false;
    const userCanDelete = userCanDeleteQuery.data ?? false;
    console.log(',userCanUpdate', userCanUpdateQuery.data);
    return (
        <div key={post.id} style={{ border: '1px solid grey', padding: 2, borderRadius: 8, marginBlock: 8 }}>
            <div>
                <strong>{post.title}</strong> ({post.published ? 'published' : 'draft'})
            </div>
            <div>{post.content}</div>
            <div>by: {post.author?.username}</div>
            <button
                onClick={() => {
                    deletePostQuery.mutateAsync({ where: { id: post.id } });
                }}
                disabled={!userCanDelete}
            >
                Delete
            </button>
            <button
                onClick={() => {
                    publishPostQuery.mutateAsync({ where: { id: post.id }, data: { published: !post.published } });
                }}
                disabled={!userCanUpdate}
            >
                {post.published ? 'Unpublish' : 'Publish'}
            </button>
        </div>
    );
};

const CreatePost = () => {
    const createPostQuery = useCreatePost();
    const { currentUser } = useAppState();

    const form = useForm({
        defaultValues: {
            title: '',
            content: '',
        },
        onSubmit: async ({ value }) => {
            // Do something with form data
            console.log(value);
            await createPostQuery.mutateAsync({
                data: {
                    title: value.title,
                    content: value.content,
                    author: {
                        connectOrCreate: {
                            where: { username: currentUser },
                            create: { username: currentUser },
                        },
                    },
                },
            });
            form.reset();
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            style={{ display: 'flex', flexDirection: 'column', border: '1px solid grey', padding: 8, borderRadius: 8 }}
        >
            <h4>create new post</h4>
            <form.Field name="title">
                {(field) => (
                    <>
                        <label htmlFor={field.name}>Title</label>
                        <input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <FieldInfo field={field} />
                    </>
                )}
            </form.Field>
            <form.Field name="content">
                {(field) => (
                    <>
                        <label htmlFor={field.name}>Content</label>
                        <input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <FieldInfo field={field} />
                    </>
                )}
            </form.Field>
            <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                    <button type="submit" disabled={!canSubmit}>
                        {isSubmitting ? '...' : 'Create Post'}
                    </button>
                )}
            />
        </form>
    );
};

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <em>{field.state.meta.errors.join(', ')}</em>
            ) : null}
            {field.state.meta.isValidating ? 'Validating...' : null}
        </>
    );
}

export default App;
