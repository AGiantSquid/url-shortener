import React, { useEffect, useState } from 'react';
import { Message } from '@yarn-ts-monorepo/common/types/message';
import { __TEST_CONSTANT__ } from '@yarn-ts-monorepo/common/constants/debug';

declare const __BACKEND_API_URL__: string;

const Home = () => {
  const [message, setMessage] = useState<Message | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(`${__BACKEND_API_URL__}/api/messages`);
        const data = await response.json();
        setMessage(data);
      } catch (err) {
        setError('Failed to fetch message');
      }
    };

    fetchMessage();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <div
        style={{
          padding: '2rem',
          marginBottom: '2rem',
          backgroundColor: '#ffffff',
          borderRadius: '4px',
          border: '1px solid #e0e0e0',
        }}
      >
        <h2
          style={{
            color: '#333333',
            fontSize: '1.5rem',
            marginBottom: '1rem',
          }}
        >
          Welcome!
        </h2>
        <p>
          Displaying value from common package to verify reloading on the
          frontend works: {__TEST_CONSTANT__}
        </p>
        <div
          style={{
            color: '#666666',
            fontSize: '1rem',
            lineHeight: '1.5',
          }}
        >
          {error ? (
            <p style={{ color: '#dc3545' }}>{error}</p>
          ) : message ? (
            <div
              style={{
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                marginBottom: '1rem',
              }}
            >
              <p>
                <strong>Message:</strong> {message.content}
              </p>
              <p>
                <strong>Author:</strong> {message.author}
              </p>
              <p>
                <strong>Time:</strong>{' '}
                {new Date(message.timestamp).toLocaleString()}
              </p>
            </div>
          ) : (
            <p>Loading message...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
