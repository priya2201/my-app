"use client";
import { Checkbox, FormControlLabel, TextField, Typography, Button, Container } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from 'react'

function AddPost() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isEditable, setIsEditable] = useState(true)

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        // formData.append('title', JSON.stringify(title))
        // formData.append('content', JSON.stringify(content))
        // formData.append('isEditable', isEditable.toString())
        const payload = {
            title,
            content,
            isEditable
        };
        const response = await fetch('http://localhost:8000/posts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Add this header
            },
            // headers: {
            //     'Content-Type': 'multipart/form-data',  // Add this header
            // },
            body: JSON.stringify(payload)
            // body: formData
        })
        const data = await response.json()

    }


    //formdata used not in parsing test so ypu have to yse upload in backend
    // const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     const formData = new FormData();
    //     formData.append('title', title);           // Append title to FormData
    //     formData.append('content', content);       // Append content to FormData
    //     formData.append('isEditable', isEditable.toString()); // Append isEditable as string

    //     const response = await fetch('http://localhost:8000/posts/', {
    //         method: 'POST',
    //         body: formData,  // Send formData (no need for Content-Type header)
    //     });

    //     const responseData = await response.json();
    //     console.log(responseData);
    // };

    return (
        <div>
            <Container component='form' onSubmit={handleSubmit}>
                <Typography color='secondary' >Add Post</Typography>
                <TextField
                    label='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    margin='normal'
                    variant='outlined' />
                <TextField
                    label='Content'
                    rows={4}
                    multiline
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    margin='normal'
                    variant='outlined' />


                <FormControlLabel control={<Checkbox
                    checked={isEditable}
                    onChange={(e) => setIsEditable(e.target.checked)}
                    color='secondary'
                />}
                    label="Product Editable"
                    color='secondary'
                />
                <Button color='secondary' variant='outlined' type='submit'>Add Post</Button>
            </Container>

        </div>
    )
}

export default AddPost