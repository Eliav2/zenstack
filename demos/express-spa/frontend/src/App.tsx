import { useState } from 'react';

import './App.css';
import { useFindManyPost } from '@express-spa-demo/backend/src/generated-hooks';

function App() {
    const postsQuery = useFindManyPost({});
    return (
        <>
            <div>zenstack demo</div>
            {postsQuery.isLoading ? (
                <div>Loading...</div>
            ) : (
                postsQuery.data?.map((post) => <div key={post.id}>{post.title}</div>)
            )}
        </>
    );
}

export default App;
