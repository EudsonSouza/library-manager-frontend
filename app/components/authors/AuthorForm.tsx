// src/components/authors/AuthorForm.tsx
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import GenericForm from '../common/GenericForm';
import { authorValidationSchema } from '../../utils/validationSchemas';

interface AuthorFormData {
  name: string;
}

interface AuthorFormProps {
  authorId?: number;
  defaultValues?: AuthorFormData;
}

function AuthorForm({ authorId, defaultValues = { name: '' } }: AuthorFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: AuthorFormData) => 
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/author${authorId ? `/${authorId}` : ''}`, {
        method: authorId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authorId ? { id: authorId, ...data } : data),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
      router.push('/authors');
    },
  });

  const handleSubmit = async (data: AuthorFormData) => {
    await mutation.mutateAsync(data);
  };

  return (
    <GenericForm<AuthorFormData>
      onSubmit={handleSubmit}
      validationSchema={authorValidationSchema}
      defaultValues={defaultValues}
      title={authorId ? 'Update Author' : 'Create Author'}
      fields={[{ name: 'name', label: 'Name' }]}
      submitButtonText={authorId ? 'Update' : 'Create'}
      isSubmitting={mutation.isPending}
    />
  );
}

export default AuthorForm;