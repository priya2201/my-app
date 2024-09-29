"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define context type
interface PostContextType {
  posts: any[];
  setPosts: React.Dispatch<React.SetStateAction<any[]>>;
}

// Create the PostContext
const PostContext = createContext<PostContextType | undefined>(undefined);

// Provider component
export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<any[]>([]);
  console.log("PostProvider initialized", posts);  // Debug log

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};

// Custom hook to use the PostContext
export const usePostContext = () => {
  const context = useContext(PostContext);
  // if (!context) {
  //   throw new Error('usePostContext must be used within a PostProvider');
  // }
  return context;
};
