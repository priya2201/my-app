"use client"; // Ensure this is a Client Component

import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    IconButton,
    Pagination,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    FormControlLabel,
    Checkbox,
    DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useMediaQuery from '@mui/material/useMediaQuery';
// import { usePostContext } from "../../contexts/PostContext"

const PostList = () => {
    // const { posts, setPosts } = usePostContext();
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6); // Number of posts per page
    const [totalPages, setTotalPages] = useState(1); // Dynamically calculated total pages
    const isMobile = useMediaQuery('(max-width:600px)'); // For mobile responsiveness
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isEditable, setIsEditable] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null); // Track selected post for modal
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State to track delete confirmation dialog
    const [postToDelete, setPostToDelete] = useState(null); // Track which post to delete

    // Fetch posts based on page and limit
    const fetchPosts = async (page: number) => {
        try {
            const response = await fetch(`http://localhost:8000/posts?page=${page}&limit=${limit}`);
            const data = await response.json();

            setPosts(data.postsData);
            setTotalPages(Math.ceil(data.totalPosts / limit)); // Dynamically calculate total pages
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts(page);
    }, [page]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    console.log(selectedPost, 'sp')
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            title,
            content,
            isEditable,
        };

        try {
            if (selectedPost) {
                // Edit post (PUT request)
                const response = await fetch(`http://localhost:8000/posts/${selectedPost._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                const updatedPost = await response.json();
                setPosts((prevPosts) =>
                    prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
                );
            } else {
                // Create new post (POST request)
                const response = await fetch('http://localhost:8000/posts/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                const newPost = await response.json();
                setPosts((prevPosts) => [...prevPosts, newPost]);
            }

            // Reset form and close modal
            setTitle('');
            setContent('');
            setIsEditable(true);
            setOpen(false);
        } catch (error) {
            console.error('Error saving post:', error);
        }
    };

    // Handle modal open/close
    const handleClickOpen = (post: any) => {
        if (post) {
            setSelectedPost(post);
            setTitle(post.title);
            setContent(post.content);
            setIsEditable(post.isEditable);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedPost(null); // Reset selected post
        setTitle('');
        setContent('');
        setIsEditable(true);
    };

    // Handle delete confirmation dialog
    const handleDeleteClick = (post: any) => {
        setPostToDelete(post);
        setDeleteDialogOpen(true); // Open the delete confirmation dialog
    };

    const handleDeleteConfirm = async () => {
        try {
            // API call to delete the post
            await fetch(`http://localhost:8000/posts/delete/${postToDelete._id}`, {
                method: 'DELETE',
            });

            // Update the posts after deletion
            setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postToDelete._id));

            setDeleteDialogOpen(false); // Close the delete dialog
            setPostToDelete(null)
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setPostToDelete(null); // Reset the post to delete
    };

    return (
        <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
            <Button color='primary' variant='contained' onClick={() => handleClickOpen(null)} style={{ marginBottom: '1rem' }} >
                Create Post
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{selectedPost ? 'Edit Post' : 'Create a New Post'}</DialogTitle>
                <DialogContent>
                    <Container component='form' onSubmit={handleSubmit}>
                        <TextField
                            label='Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            margin='normal'
                            variant='outlined'
                            fullWidth
                        />
                        <TextField
                            label='Content'
                            rows={4}
                            multiline
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            margin='normal'
                            variant='outlined'
                            fullWidth
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isEditable}
                                    onChange={(e) => setIsEditable(e.target.checked)}
                                    color='secondary'
                                />
                            }
                            label="Post Editable"
                        />
                        <Button color='secondary' variant='outlined' type='submit'>
                            {selectedPost ? 'Update Post' : 'Create Post'}
                        </Button>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this post?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Grid container spacing={isMobile ? 1 : 2} >
                {posts.map((post: any) => (
                    <Grid item xs={12} sm={8} md={6} key={post.id}>
                        <Card
                            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '100%' }}
                        // onClick={() => handleClickOpen(post)} // Open modal on post click
                        >
                            <CardContent>
                                <Typography variant="h5" gutterBottom>{post.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {post.content}
                                </Typography>
                            </CardContent>
                            <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <IconButton color="primary" aria-label="edit post" onClick={(e) => {
                                    e.stopPropagation()
                                    handleClickOpen(post)
                                }}>
                                    {post.isEditable === true ? <EditIcon /> : ""}
                                </IconButton>
                                <IconButton color="secondary" aria-label="delete post" onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeleteClick(post)
                                }}>
                                    <DeleteIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
            />
        </Container>
    );
};

export default PostList;
