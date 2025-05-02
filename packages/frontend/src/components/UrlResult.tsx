import { useState } from 'react';
import { CreateUrlResponse } from '@url-shortener/common/types/url';

interface UrlResultProps {
  url: CreateUrlResponse | null;
}

const UrlResult = ({ url }: UrlResultProps) => {
  const [copied, setCopied] = useState(false);

  if (!url) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url.shortUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="text-lg font-semibold text-green-800 mb-2">URL Shortened Successfully!</h3>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
        <span className="text-gray-700 font-medium">Your short URL:</span>
        <a
          href={url.shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline break-all"
        >
          {url.shortUrl}
        </a>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <span className="text-gray-700 font-medium">Original URL:</span>
        <span className="text-gray-600 break-all">{url.originalUrl}</span>
      </div>

      <button
        onClick={copyToClipboard}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {copied ? 'Copied!' : 'Copy Short URL'}
      </button>
    </div>
  );
};

export default UrlResult;