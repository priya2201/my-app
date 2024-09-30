"use client";  // Make this a client component

import { Checkbox, FormControlLabel, TextField, Typography, Button, Container } from "@mui/material";
import React, { ChangeEvent, useState } from 'react';
export default function add() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditable, setIsEditable] = useState(true);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      title,
      content,
      isEditable
    };

    try {
      const response = await fetch('http://localhost:8000/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Add this header
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // Update context with the new post

    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div>
      <Container component='form' onSubmit={handleSubmit}>
        <Typography color='secondary'>Add Post</Typography>
        <TextField
          label='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          margin='normal'
          variant='outlined'
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
        <Button color='secondary' variant='outlined' type='submit'>Add Post</Button>
      </Container>
      <h1>Adding...</h1>
    </div>
  );
}

