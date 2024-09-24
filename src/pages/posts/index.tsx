// src/pages/posts/index.tsx
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AllPostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch all posts from the API
    fetch("http://localhost:8000/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      <h1>All Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link href={`/posts/${post._id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
