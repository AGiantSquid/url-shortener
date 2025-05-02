import { useState, useEffect } from 'react';
import UrlForm from '../components/UrlForm';
import UrlResult from '../components/UrlResult';
import UrlList from '../components/UrlList';
import { Url, CreateUrlResponse } from '@url-shortener/common/types/url';

const Home = () => {
  const [newUrl, setNewUrl] = useState<CreateUrlResponse | null>(null);
  const [urls, setUrls] = useState<Url[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
      try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:5000/api/urls');

      if (!response.ok) {
        throw new Error('Failed to fetch URLs');
      }

        const data = await response.json();
      setUrls(data);
      } catch (err) {
      setError('Failed to load URLs. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
      }
    };

  const handleUrlCreated = (url: CreateUrlResponse) => {
    setNewUrl(url);
    fetchUrls(); // Refresh the list
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">URL Shortener</h1>
          <p className="text-gray-600 mt-2">
            Create short, memorable links from long URLs
        </p>
        </header>

        <UrlForm onUrlCreated={handleUrlCreated} />

        {newUrl && <UrlResult url={newUrl} />}

        {loading ? (
          <div className="mt-8 text-center">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            <p className="mt-2 text-gray-600">Loading URLs...</p>
          </div>
        ) : error ? (
          <div className="mt-8 p-4 bg-red-100 text-red-700 rounded">
            {error}
            </div>
          ) : (
          <UrlList urls={urls} />
          )}
      </div>
    </div>
  );
};

export default Home;
