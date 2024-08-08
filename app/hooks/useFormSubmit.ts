// src/hooks/useFormSubmit.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface UseFormSubmitOptions<T> {
  queryKey: string;
  mutationFn: (data: T) => Promise<any>;
  redirectPath: string;
}

function useFormSubmit<T>({ queryKey, mutationFn, redirectPath }: UseFormSubmitOptions<T>) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      router.push(redirectPath);
    },
  });
}

export default useFormSubmit;