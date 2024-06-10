import { useMutation, useQueryClient } from 'react-query';
import { createProduct } from './services/productsService';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CreateProductPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [title, setTitle] = useState('');

  const mutation = useMutation(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      router.push('/products');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title });
  };

  return (
    <div>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
