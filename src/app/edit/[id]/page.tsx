"use client"
import { FormControlLabel, InputLabel, TextField, Typography, Checkbox, Button, FormControl, Container } from '@mui/material'
import React, { ChangeEvent,  useState } from 'react'
export default function EditPost() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isEditable, setIsEditable] = useState(true)
    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(e.preventDefault())
        const formData = new FormData()
        formData.append('title', title)
        formData.append('content', content)
        formData.append('isEditable', isEditable.toString())
        const response = await fetch(`http://localhost:8000/posts/${id}`, {
            method: 'PUT',
            body: formData
        })
        console.log(response)
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

                <FormControl>
                    <InputLabel>Is Editable</InputLabel>
                    <FormControlLabel control={<Checkbox
                        label="Product Editable"
                        checked={isEditable}
                        onChange={(e) => setIsEditable(e.target.checked)}
                    />} />
                </FormControl>
                <Button color='secondary' type='submit'>Edit Post</Button>
            </Container>):"You can't edit"}

        </div>
    )
}
