"use client";
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { createProduct } from '../services/productsService';

export default function CreateProductPage() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const mutation = useMutation(createProduct);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const imageUrls: string[] = [];

    try {
      if (images.length) {
        for (let image of images) {
          const formData = new FormData();
          formData.append('file', image);
          const response = await axios.post('https://api.escuelajs.co/api/v1/files/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          imageUrls.push(response.data.location);
        }
      }

      await mutation.mutateAsync({ title, price, description, images: imageUrls });
      queryClient.invalidateQueries('products'); // Обновляем список продуктов после успешного создания
      setTitle('');
      setPrice('');
      setDescription('');
      setImages([]);
    } catch (err) {
      console.error('Product creation error:', err);
      setError('Product creation failed. Please try again.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  return (
    <div>
      <h1>Create Product</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Price:</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <div>
          <label>Images:</label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
