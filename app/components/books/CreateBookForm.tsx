"use client"

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { useRouter } from 'next/navigation';

import {FormContainer, StyledButton} from '@/app/styles/formStyledComponents'

interface IFormInput {
  title: string;
  description?: string; 
  authorId: number;
  bookGenreId: number;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required').max(200, 'Title must be at most 200 characters'),
  description: Yup.string().optional().max(1000, 'Description must be at most 1000 characters'),
  authorId: Yup.number().required('Author is required'),
  bookGenreId: Yup.number().required('Book genre is required'),
});

interface Author {
  id: number;
  name: string;
}

interface BookGenre {
  id: number;
  name: string;
}

const CreateBookForm: React.FC = () => {
  const router = useRouter();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [bookGenres, setBookGenres] = useState<BookGenre[]>([]);

  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: '',
      description: '',
      authorId: 0,
      bookGenreId: 0,
    }
  });

  useEffect(() => {
    fetchAuthors();
    fetchBookGenres();
  }, []);

  const fetchAuthors = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/author`);
      if (res.ok) {
        const data = await res.json();
        setAuthors(data);
      }
    } catch (error) {
      console.error('Failed to fetch authors:', error);
    }
  };

  const fetchBookGenres = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bookgenre`);
      if (res.ok) {
        const data = await res.json();
        setBookGenres(data);
      }
    } catch (error) {
      console.error('Failed to fetch book genres:', error);
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const newBook = await res.json();
        console.log(newBook);
        router.push('/books');
      } else {
        console.error('Failed to create book');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        )}
      />
      <Controller
        name="authorId"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth margin="normal" error={!!errors.authorId}>
            <InputLabel id="author-label">Author</InputLabel>
            <Select
              {...field}
              labelId="author-label"
              label="Author"
            >
              {authors.map((author) => (
                <MenuItem key={author.id} value={author.id}>{author.name}</MenuItem>
              ))}
            </Select>
            {errors.authorId && <FormHelperText>{errors.authorId.message}</FormHelperText>}
          </FormControl>
        )}
      />
      <Controller
        name="bookGenreId"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth margin="normal" error={!!errors.bookGenreId}>
            <InputLabel id="book-genre-label">Book Genre</InputLabel>
            <Select
              {...field}
              labelId="book-genre-label"
              label="Book Genre"
            >
              {bookGenres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
              ))}
            </Select>
            {errors.bookGenreId && <FormHelperText>{errors.bookGenreId.message}</FormHelperText>}
          </FormControl>
        )}
      />
      <StyledButton type="submit" variant="contained" color="primary">
        Create Book
      </StyledButton>
    </FormContainer>
  );
}

export default CreateBookForm;