'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the OLX App</h1>
      <p>
        This is a simple application to demonstrate product listing and creation using Next.js and React Query.
      </p>
      <nav>
        <ul>
          <li>
            <Link href="/products">View Products</Link>
          </li>
          <li>
            <Link href="/create">Create Product</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
