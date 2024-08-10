"use client"

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

import {FormContainer, StyledButton} from '@/app/styles/formStyledComponents'


interface IFormInput {
  name: string;
}


const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});


const CreateAuthorForm: React.FC = () => {
  const router = useRouter();


  const { handleSubmit, register, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
  });


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
        

        router.push('/authors');
      } else {

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