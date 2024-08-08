'use client'

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { List, ListItem, ListItemText, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

interface Author {
  id: number;
  name: string;
}

function AuthorList() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery<Author[]>({
    queryKey: ['authors'],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/author`).then((res) =>
        res.json()
      ),
  });

  const deleteAuthorMutation = useMutation({
    mutationFn: (authorId: number) =>
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/author/${authorId}`, {
        method: 'DELETE',
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete author');
        }
        return res.text();
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    },
  });

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {(error as Error).message}</Typography>;

  const handleEdit = (authorId: number) => {
    router.push(`/authors/edit/${authorId}`);
  };

  const handleCreate = () => {
    router.push('/authors/create');
  };

  const handleDelete = async (authorId: number) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      try {
        await deleteAuthorMutation.mutateAsync(authorId);
        alert('Author deleted successfully!');
      } catch (error) {
        alert('Failed to delete author');
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
        Create New Author
      </Button>
      <List>
        {data?.map((author) => (
          <ListItem 
            key={author.id}
            secondaryAction={
              <Box>
                <Button 
                  variant="outlined" 
                  onClick={() => handleEdit(author.id)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button 
                  variant="outlined" 
                  color="error"
                  onClick={() => handleDelete(author.id)}
                >
                  Delete
                </Button>
              </Box>
            }
          >
            <ListItemText primary={author.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default AuthorList;