import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const postDetail = () => {
    const [post, setpost] = useState({ title: '', content: '' });
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            const fetchpost = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/posts/${id}`);
                    setpost(response.data);
                } catch (error) {
                    console.error('Error fetching post:', error);
                }
            };
            fetchpost();
        }
    }, [id]);

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8000/posts/${id}`, post);
            router.push('/posts'); // Redirect to post list after update
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/posts/${id}`);
            router.push('/posts'); // Redirect to post list after delete
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div>
            <h1>Edit post</h1>
            <input
                type="text"
                value={post.title}
                onChange={(e) => setpost({ ...post, title: e.target.value })}
            />
            <textarea
                value={post.content}
                onChange={(e) => setpost({ ...post, content: e.target.value })}
            />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default postDetail;
