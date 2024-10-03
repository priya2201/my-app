// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import axios from 'axios';
// import { usePostContext } from "../../contexts/PostContext"

// const PostsPage = () => {
//   const [posts, setPosts] = useState()

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/posts');
//         setPosts(response.data.postsData);
//         console.log(response.data.postsData, 'rp')
//       } catch (error) {
//         // console.error('Error fetching posts:', error);
//       }
//     };

//     fetchPosts();
//   }, [setPosts]);

//   return (
//     <div>
//       <h1>All Posts</h1>
//       <ul>
//         {posts.map((post) => (
//           <li key={post.id}>
//             <Link href={`/posts/${post._id}`}>{post.title}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PostsPage;


// const GetPosts = () => {
//   const { posts, setPosts } = usePostContext()

//   useEffect(() => {
//     // Fetch the posts when the component loads
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/posts');
//         const data = await response.json();
//         setPosts(data.postsData);  // Set the posts into the context
//         console.log(data.postsData);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };

//     fetchPosts();
//   }, [setPosts]);

//   return (
//     <div>
//       <h1>All Posts</h1>
//       {posts ? (
//         <ul>
//           {posts.map((post: any) => (
//             <li key={post._id}>
//               <Link href={`/posts/${post._id}`}>                          <h3>{post.title}</h3>
//                 <p>{post.content}</p></Link>

//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No posts found</p>
//       )}
//     </div>
//   );
// };

// export default GetPosts;


// // src/components/PostList.tsx
// // import React, { useEffect, useState } from 'react';
// // import { Container, Grid, Card, CardContent, Typography, IconButton, Pagination, Button } from '@mui/material';
// // import EditIcon from '@mui/icons-material/Edit';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import axios from 'axios';
// // import useMediaQuery from '@mui/material/useMediaQuery';
// // import { usePostContext } from "../../app/contexts/PostContext"

// // const PostList = () => {
// //   const { posts, setPosts } = usePostContext();
// //   const [page, setPage] = useState(1);
// //   const [limit, setLimit] = useState(6);  // Number of posts per page
// //   const [totalPages, setTotalPages] = useState(1); // Dynamically calculated total pages
// //   const isMobile = useMediaQuery('(max-width:600px)');  // For mobile responsiveness

// //   // Fetch posts based on page and limit
// //   const fetchPosts = async (page: number) => {
// //     try {
// //       const response = await fetch(`http://localhost:8000/posts?page=${page}&limit=${limit}`);
// //       const data = await response.json();

// //       setPosts(data.postsData);
// //       console.log(data.postsData)
// //       setTotalPages(Math.ceil(data.totalPosts / limit));  // Dynamically calculate total pages
// //     } catch (error) {
// //       console.error('Error fetching posts:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPosts(page);
// //   }, [page]);

// //   const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
// //     setPage(value);
// //   };

// //   return (
// //     <Container>
// //       <Button variant="contained" color="primary" style={{ marginBottom: '1rem' }}>
// //         Create Post
// //       </Button>

// //       <Grid container spacing={isMobile ? 2 : 3}>
// //         {posts.map((post: any) => (
// //           <Grid item xs={12} sm={6} md={4} key={post._id}>
// //             <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
// //               <CardContent>
// //                 <Typography variant="h5" gutterBottom>{post.title}</Typography>
// //                 <Typography variant="body2" color="textSecondary">
// //                   {post.content.substring(0, 150)}...  {/* Truncate content for brevity */}
// //                 </Typography>
// //               </CardContent>

// //               <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
// //                 <IconButton color="primary" aria-label="edit post">
// //                   <EditIcon />
// //                 </IconButton>
// //                 <IconButton color="secondary" aria-label="delete post">
// //                   <DeleteIcon />
// //                 </IconButton>
// //               </CardContent>
// //             </Card>
// //           </Grid>
// //         ))}
// //       </Grid>

// //       {/* Pagination component */}
// //       <Pagination
// //         count={totalPages}
// //         page={page}
// //         onChange={handlePageChange}
// //         style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
// //       />
// //     </Container>
// //   );
// // };

// // export default PostList;


// src/app/posts/page.tsx

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
import { usePostContext } from "../../contexts/PostContext"

const PostList = () => {
  const { posts, setPosts } = usePostContext();
  // const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6); // Number of posts per page
  const [totalPages, setTotalPages] = useState(1); // Dynamically calculated total pages
  const isMobile = useMediaQuery('(max-width:600px)'); // For mobile responsiveness
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditable, setIsEditable] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); // Track selected post for modal

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      title,
      content,
      isEditable,
    };

    try {
      const response = await fetch('http://localhost:8000/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const newPost = await response.json();
      setPosts((prevPosts) => [...prevPosts, newPost]);

      // Reset form and close modal
      setTitle('');
      setContent('');
      setIsEditable(true);
      setOpen(false);
    } catch (error) {
      console.error('Error adding post:', error);
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

  return (
    <Container>
      <Button color='primary' variant='contained' onClick={() => handleClickOpen(null)} style={{ marginBottom: '20px' }}>
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
      <Grid container spacing={isMobile ? 2 : 3}>
        {posts.map((post: any) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
              onClick={() => handleClickOpen(post)} // Open modal on post click
            >
              <CardContent>
                <Typography variant="h5" gutterBottom>{post.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {post.content.substring(0, 150)}... {/* Truncate content for brevity */}
                </Typography>
              </CardContent>
              <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                <IconButton color="primary" aria-label="edit post">
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" aria-label="delete post">
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


// src/app/posts/page.tsx
// "use client"; // This line makes sure it's a Client Component

// import React from 'react';
// import { usePostContext } from "../../contexts/PostContext"
// import { Container, Grid, Card, CardContent, Typography } from '@mui/material';

// const PostList = () => {
//   const { posts } = usePostContext(); // Access posts from context

//   return (
//     <Container>
//       <h1>All Posts</h1>
//       <Grid container spacing={2}>
//         {posts.map((post) => (
//           <Grid item xs={12} sm={6} md={4} key={post.id}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h5">{post.title}</Typography>
//                 <Typography variant="body2">{post.content}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default PostList; //
