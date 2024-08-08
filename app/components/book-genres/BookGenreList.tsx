'use client'

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { List, ListItem, ListItemText, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

interface BookGenre {
  id: number;
  name: string;
}

function BookGenreList() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery<BookGenre[]>({
    queryKey: ['bookGenres'],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bookGenre`).then((res) =>
        res.json()
      ),
  });

  const deleteBookGenreMutation = useMutation({
    mutationFn: (bookGenreId: number) =>
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bookGenre/${bookGenreId}`, {
        method: 'DELETE',
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete book genre');
        }
        return res.text();
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookGenres'] });
    },
  });

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {(error as Error).message}</Typography>;

  const handleEdit = (bookGenreId: number) => {
    router.push(`/book-genres/edit/${bookGenreId}`);
  };

  const handleCreate = () => {
    router.push('/book-genres/create');
  };

  const handleDelete = async (bookGenreId: number) => {
    if (window.confirm('Are you sure you want to delete this book genre?')) {
      try {
        await deleteBookGenreMutation.mutateAsync(bookGenreId);
        alert('Book genre deleted successfully!');
      } catch (error) {
        alert('Failed to delete book genre');
      }
    }
  };

  return (
    <Box>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCreate}
        sx={{ mb: 2 }}
      >
        Create New Book Genre
      </Button>
      {data && data.length > 0 ? (
        <List>
          {data.map((bookGenre) => (
            <ListItem 
              key={bookGenre.id}
              secondaryAction={
                <Box>
                  <Button 
                    variant="outlined" 
                    onClick={() => handleEdit(bookGenre.id)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error"
                    onClick={() => handleDelete(bookGenre.id)}
                  >
                    Delete
                  </Button>
                </Box>
              }
            >
              <ListItemText primary={bookGenre.name} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No book genres found. Click the button above to create one.
        </Typography>
      )}
    </Box>
  );
}

export default BookGenreList;