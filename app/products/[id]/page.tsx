import { useQuery } from 'react-query';
import { fetchProducts } from '../../services/productsService';

export default function ProductsPage() {
  const { data, error, isLoading } = useQuery('products', fetchProducts);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred</div>;

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data.map((product: any) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}
