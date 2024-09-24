import { useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { usePostContext } from "../../app/contexts/PostContext"

// const PostsPage = () => {
//   const { posts, setPosts } = usePostContext();

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/posts');
//         setPosts(response.data.postsData);
//         // console.log(response.data.postsData, 'rp')
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


const GetPosts = () => {
  const { posts, setPosts } = usePostContext();

  useEffect(() => {
      // Fetch the posts when the component loads
      const fetchPosts = async () => {
          try {
              const response = await fetch('http://localhost:8000/posts');
              const data = await response.json();
              setPosts(data.postsData);  // Set the posts into the context
          } catch (error) {
              console.error('Error fetching posts:', error);
          }
      };
      
      fetchPosts();
  }, [setPosts]);

  return (
      <div>
          <h1>All Posts</h1>
          {posts.length > 0 ? (
              <ul>
                  {posts.map((post: any) => (
                    <li key={post._id}>
                       <Link href={`/posts/${post._id}`}>                          <h3>{post.title}</h3>
                       <p>{post.content}</p></Link>

                      </li>
                  ))}
              </ul>
          ) : (
              <p>No posts found</p>
          )}
      </div>
  );
};

export default GetPosts;
