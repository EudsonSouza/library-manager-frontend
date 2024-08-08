// src/utils/validationSchemas.ts
import * as Yup from 'yup';

export const authorValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });

// Add similar schemas for Book and BookGenre