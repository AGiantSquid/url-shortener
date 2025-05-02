import { useState } from 'react';
import { Url } from '@url-shortener/common/types/url';

interface UrlListProps {
  urls: Url[];
}

const UrlList = ({ urls }: UrlListProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  if (urls.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-500">
        No URLs have been shortened yet.
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Your Shortened URLs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Original URL</th>
              <th className="py-2 px-4 border-b text-left">Short URL</th>
              <th className="py-2 px-4 border-b text-left">Created</th>
              <th className="py-2 px-4 border-b text-left">Visits</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b truncate max-w-xs" title={url.originalUrl}>
                  {url.originalUrl}
                </td>
                <td className="py-2 px-4 border-b">
                  <a
                    href={url.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {url.shortUrl}
                  </a>
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(url.createdAt).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b">{url.visits}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => copyToClipboard(url.shortUrl, url.id)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    {copiedId === url.id ? 'Copied!' : 'Copy'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UrlList;