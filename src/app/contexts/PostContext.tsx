// // contexts/PostContext.tsx
'use client'

import { createContext, useContext, useState } from "react";

// import { createContext, useContext, useState, ReactNode } from 'react';

// // Create a context with default value as null
const PostContext = createContext<any>(null);

// export const PostProvider = ({ children }: { children: ReactNode }) => {
//   const [posts, setPosts] = useState([]);

//   return (
//     <PostContext.Provider value={{ posts, setPosts }}>
//       {children}
//     </PostContext.Provider>
//   );
// };



export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState([]);  // Ensure this value is initialized correctly
  console.log('Provider value:', { posts, setPosts });

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};