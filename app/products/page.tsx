'use client';

import { useQuery } from 'react-query';
import { fetchProducts } from '../services/productsService';

export default function ProductsPage() {
  const { data: products, error, isLoading } = useQuery('products', fetchProducts);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

