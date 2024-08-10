import React from 'react';
import { useForm, SubmitHandler, FieldValues, DefaultValues, UseFormProps } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import FormContainer from './FormContainer';
import StyledButton from './StyledButton';

type GenericFormData = Record<string, any>;

interface GenericFormProps<T extends GenericFormData> {
  onSubmit: (data: T) => Promise<void>;
  validationSchema: Yup.ObjectSchema<any>;
  defaultValues: DefaultValues<T>;
  title: string;
  fields: Array<{name: keyof T; label: string}>;
  submitButtonText: string;
  isSubmitting: boolean;
}

function GenericForm<T extends GenericFormData>({
  onSubmit,
  validationSchema,
  defaultValues,
  title,
  fields,
  submitButtonText,
  isSubmitting
}: GenericFormProps<T>) {
  const formOptions: UseFormProps<T> = {
    defaultValues,
    resolver: yupResolver(validationSchema) as any,
  };

  const { handleSubmit, register, formState: { errors } } = useForm<T>(formOptions);

  const onSubmitWrapper: SubmitHandler<T> = async (data) => {
    await onSubmit(data);
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmitWrapper)}>
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>
      {fields.map((field) => (
        <TextField
          key={field.name as string}
          id={field.name as string}
          label={field.label}
          {...register(field.name as any)}
          error={!!errors[field.name]}
          helperText={errors[field.name]?.message as string}
          fullWidth
          variant="outlined"
        />
      ))}
      <StyledButton 
        type="submit" 
        variant="contained" 
        color="primary"
        disabled={isSubmitting}
        fullWidth
      >
        {isSubmitting ? 'Submitting...' : submitButtonText}
      </StyledButton>
    </FormContainer>
  );
}

export default GenericForm;