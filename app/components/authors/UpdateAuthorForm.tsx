'use client'

import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { TextField, Button, CircularProgress, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import {FormContainer, StyledButton} from '@/app/styles/formStyledComponents'

interface Author {
  id: number
  name: string
}

interface IFormInput {
  name: string
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
})



function UpdateAuthorForm({ authorId }: { authorId: number }) {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data: author, isLoading, error } = useQuery<Author>({
    queryKey: ['author', authorId],
    queryFn: () => fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/author/${authorId}`).then((res) => res.json()),
  })

  const updateAuthorMutation = useMutation({
    mutationFn: (data: IFormInput) => 
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/author/${authorId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: authorId, name: data.name }),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['author', authorId] })
      router.push('/authors')
    },
  })

  const { handleSubmit, register, formState: { errors } } = useForm<IFormInput>({
    defaultValues: { name: author?.name || '' },
    resolver: yupResolver(validationSchema),
    values: { name: author?.name || '' }, // This will update the form when the author data is fetched
  })

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await updateAuthorMutation.mutateAsync(data)
    } catch (error) {
      console.error(error)
    }
  }

  if (error) return <Typography color="error">Error: {(error as Error).message}</Typography>
  if (isLoading) return <CircularProgress />

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" component="h1" gutterBottom>
        Update Author
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
        disabled={updateAuthorMutation.isPending}
        fullWidth
      >
        {updateAuthorMutation.isPending ? 'Updating...' : 'Update Author'}
      </StyledButton>
    </FormContainer>
  )
}

export default UpdateAuthorForm