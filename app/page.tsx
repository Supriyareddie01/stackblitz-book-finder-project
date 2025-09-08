'use client';
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBooks = async (searchQuery: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=12`
      );
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) {
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      fetchBooks(query);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center p-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
        className="p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={handleSearch}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {books.map((book: any) => (
          <div key={book.id} className="border p-4 rounded">
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt={book.volumeInfo.title}
              className="w-full h-48 object-cover mb-2"
            />
            <h3 className="text-lg font-semibold">{book.volumeInfo.title}</h3>
            <p className="text-sm">{book.volumeInfo.authors?.join(', ')}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
