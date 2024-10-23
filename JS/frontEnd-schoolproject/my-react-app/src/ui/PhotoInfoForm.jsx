import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PhotoInfoForm({ initialTitle = '', initialDescription = '', onSubmit, isSubmitted, showUploadButton = true, id }) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  // Sync the initial data when it changes
  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
  }, [initialTitle, initialDescription]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ title, description }); // Pass the form data back to the parent
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: '10px', width: '300px', marginLeft: '10px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ padding: '10px', width: '300px', height: '100px', marginLeft: '10px' }}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitted} // Disable the button after the first click
          style={{
            padding: '10px 20px',
            backgroundColor: isSubmitted ? 'gray' : '#28a745',
            color: 'white',
            cursor: isSubmitted ? 'not-allowed' : 'pointer',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          {isSubmitted ? 'Submitted' : 'Submit'}
        </button>
      </form>

      {/* Conditionally Render the Upload Photo Button */}
      {showUploadButton && (
        <div style={{ marginTop: '20px' }}>
          <Link
            to={`/updatePhoto/${id}`} // Pass the photo ID to navigate to UpdatePhoto page
            style={{
              padding: '10px 20px',
              backgroundColor: 'green',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
            }}
          >
            Update Photo
          </Link>
        </div>
      )}

      {/* Link back to home page */}
      <div style={{ marginTop: '20px' }}>
        <Link
          to="/"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
          }}
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}