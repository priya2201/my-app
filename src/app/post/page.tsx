"use client";
import { CheckBox } from '@mui/icons-material'
import { FormControlLabel, InputLabel, TextField, Typography, Checkbox, Button, FormControl, Container } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'

function AddPost() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isEditable, setIsEditable] = useState(true)
    //     const formData = new FormData()
    //     formData.append('title', title)
    //     formData.append('content', content)
    //     formData.append('isEditable', isEditable.toString())

    //     const fetching = async () => {
    //         const response = await fetch('http://localhost:8000/posts/', {
    //             method: 'POST',
    //             body: formData
    //         })
    //         const data = await response.json()
    //         console.log(data)
    //     }
    //     fetching()
    // }, [])
    console.log(title, content, 'tc')
    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(e.preventDefault())
        const formData = new FormData()
        formData.append('title', title)
        formData.append('content', content)
        formData.append('isEditable', isEditable.toString())
        console.log([...formData.entries()])
        const response = await fetch('http://localhost:8000/posts/', {
            method: 'POST',
            body: formData
        })
        console.log(response)
    }
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
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    margin='normal'
                    variant='outlined' />

                <FormControl>
                    <InputLabel>Is Editable</InputLabel>
                    <FormControlLabel control={<CheckBox
                        label="Product Editable"
                        checked={isEditable}
                        onChange={(e) => setIsEditable(e.target.checked)}
                    />} />
                </FormControl>
                <Button color='secondary' type='submit'>Add Post</Button>
            </Container>

        </div>
    )
}

export default AddPost