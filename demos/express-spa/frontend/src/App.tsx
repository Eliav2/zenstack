import './App.css';
import { useCreatePost, useFindManyPost } from '@express-spa-demo/backend/src/generated-hooks';
import { FieldApi, useForm } from '@tanstack/react-form';
import React from 'react';
import { useAppState } from './AppStateProvider.tsx';

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
            <h4>posts</h4>
            {postsQuery.isLoading ? (
                <div>Loading...</div>
            ) : (
                (posts.length === 0 && <span>No posts yet</span>) ||
                posts?.map((post) => (
                    <div
                        key={post.id}
                        style={{ border: '1px solid grey', padding: 2, borderRadius: 8, marginBlock: 8 }}
                    >
                        <strong>{post.title}</strong>
                        <div>{post.content}</div>
                        <div>by: {post.author?.username}</div>
                    </div>
                ))
            )}
        </div>
    );
};

const Post = ({ post }: { post: any }) => {
    return (
        <div style={{ border: '1px solid grey', padding: 8, borderRadius: 8, marginBlock: 8 }}>
            <strong>{post.title}</strong>
            <div>{post.content}</div>
            <div>by: {post.author?.username}</div>
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
