"use client"

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

import {FormContainer, StyledButton} from '@/app/components/authors/styles'

// Definir a interface para os dados do formulário
interface IFormInput {
  name: string;
}

// Definir o esquema de validação com Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});

/* Create Item Form */
const CreateAuthorForm: React.FC = () => {
  const router = useRouter();

  /* Hooks */
  const { handleSubmit, register, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
  });

  /* HandleOnSubmit */
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/author`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        const newItem = await res.json();
        console.log(newItem);
        // log the newly created item to the console
        
        // Redirect to the /author page
        router.push('/authors');
      } else {
        // Handle error case
        console.error('Failed to create author');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name:</label>
      <TextField
        id="name"
        {...register('name')}
        variant="outlined"
        fullWidth
        margin="normal"
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ''}
      />
      <StyledButton type="submit" variant="contained" color="primary">
        Create Author
      </StyledButton>
    </FormContainer>
  );
}

export default CreateAuthorForm;