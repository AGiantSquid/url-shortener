import React from 'react';

const Navbar = () => {
  return (
    <header
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        padding: '1rem 0',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
          display: 'flex',
          alignItems: 'center',
          minHeight: '56px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              fontSize: '1.5rem',
              color: '#333333',
            }}
          >
            🚀
          </span>
          <h1
            style={{
              fontSize: '1.25rem',
              fontWeight: '500',
              color: '#333333',
              margin: 0,
            }}
          >
            Your App
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
