'use client'

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { List, ListItem, ListItemText, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

interface Book {
    id: number;
    title: string;
    description: string;
    authorId: number;
    bookGenreId: number;
    author: { id: number; name: string };
    bookGenre: { id: number; name: string };
  }

function BookList() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/book`).then((res) =>
        res.json()
      ),
  });

  const deleteBookMutation = useMutation({
    mutationFn: (bookId: number) =>
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/book/${bookId}`, {
        method: 'DELETE',
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete book');
        }
        return res.text();
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {(error as Error).message}</Typography>;

  const handleEdit = (bookId: number) => {
    router.push(`/books/edit/${bookId}`);
  };

  const handleCreate = () => {
    router.push('/books/create');
  };

  const handleDelete = async (bookId: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBookMutation.mutateAsync(bookId);
        alert('Book deleted successfully!');
      } catch (error) {
        alert('Failed to delete book');
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
        Create New Book
      </Button>
      {data && data.length > 0 ? (
        <List>
          {data.map((book) => (
            <ListItem
              key={book.id}
              secondaryAction={
                <Box>
                  <Button
                    variant="outlined"
                    onClick={() => handleEdit(book.id)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </Button>
                </Box>
              }
            >
              <ListItemText 
                primary={book.title} 
                secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body2" color="text.primary">
                      Description: 
                    </Typography>
                    {` ${book.description}`}
                    <br />
                    <Typography component="span" variant="body2" color="text.primary">
                      Author: 
                    </Typography>
                    {` ${book.author.name}`}
                    <br />
                    <Typography component="span" variant="body2" color="text.primary">
                      Genre: 
                    </Typography>
                    {` ${book.bookGenre.name}`}
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No books found. Click the button above to create one.
        </Typography>
      )}
    </Box>
  );
}

export default BookList;