'use client'

import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { TextField, CircularProgress, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

import {FormContainer, StyledButton} from '@/app/styles/formStyledComponents'

interface BookGenre {
  id: number
  name: string
}

interface IFormInput {
  name: string
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
})

function UpdateBookGenreForm({ bookGenreId }: { bookGenreId: number }) {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data: bookGenre, isLoading, error } = useQuery<BookGenre>({
    queryKey: ['bookGenre', bookGenreId],
    queryFn: () => fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bookGenre/${bookGenreId}`).then((res) => res.json()),
  })

  const updateBookGenreMutation = useMutation({
    mutationFn: (data: IFormInput) => 
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bookGenre/${bookGenreId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: bookGenreId, name: data.name }),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookGenre', bookGenreId] })
      router.push('/book-genres')
    },
  })

  const { handleSubmit, register, formState: { errors } } = useForm<IFormInput>({
    defaultValues: { name: bookGenre?.name || '' },
    resolver: yupResolver(validationSchema),
    values: { name: bookGenre?.name || '' },
  })

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await updateBookGenreMutation.mutateAsync(data)
    } catch (error) {
      console.error(error)
    }
  }

  if (error) return <Typography color="error">Error: {(error as Error).message}</Typography>
  if (isLoading) return <CircularProgress />

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" component="h1" gutterBottom>
        Update Book Genre
      </Typography>
      <TextField
        id="name"
        label="Name"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
        variant="outlined"
      />
      <StyledButton 
        type="submit" 
        variant="contained" 
        color="primary"
        disabled={updateBookGenreMutation.isPending}
        fullWidth
      >
        {updateBookGenreMutation.isPending ? 'Updating...' : 'Update Book Genre'}
      </StyledButton>
    </FormContainer>
  )
}

export default UpdateBookGenreForm