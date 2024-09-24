"use client";
import { FormControlLabel, InputLabel, 
TextField, Typography, Checkbox, Button, FormControl, Container } from '@mui/material'
import { useRouter } from 'next/router';
import React, {  ChangeEvent, useState } from 'react';


export default function EditPost() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isEditable, setIsEditable] = useState(true)
    const router = useRouter();

    const { id } = router.query;

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        const payload = {
            title,
            content,
            isEditable
        };
        const response = await fetch(`http://localhost:8000/posts/:${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',  // Add this header
            },
          
            body: JSON.stringify(payload)
        })
        console.log(response)
        console.log(await response.json());

    }
    return (
        <div>
            {isEditable ? (<Container component='form' onSubmit={handleSubmit}>
                <Typography color='secondary' >Edit Post</Typography>
                <TextField
                    label='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    margin='normal'
                    variant='outlined' />
                <TextField
                    label='Content'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    margin='normal'
                    variant='outlined' />

              
                <FormControlLabel control={<Checkbox
                    checked={isEditable}
                    onChange={(e) => setIsEditable(e.target.checked)}
                />}
                label='Product Editable' />
                <Button color='secondary' variant='outlined' type='submit'>Edit Post</Button>
            </Container>):"You can't edit"}

        </div>
    )
}
