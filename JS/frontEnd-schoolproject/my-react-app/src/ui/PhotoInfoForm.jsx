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
      onSubmit({ title, description }); 
    }
  };

  const buttonStyles = {
    padding: '10px 20px',
    width: '180px', 
    backgroundColor: '#28a745', 
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  };

  return (
    <form onSubmit={handleSubmit} className="text-center mx-auto" style={{ maxWidth: '400px' }}>
      
      {/* Title Field */}
      <div className="mb-3 text-start">
        <label className="form-label">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
          required
        />
      </div>

      {/* Description Field */}
      <div className="mb-3 text-start">
        <label className="form-label">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
          style={{ height: '150px' }} // Adjusted height
          required
        />
      </div>

      {/* Button Group */}
      <div className="d-grid gap-3">
        
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitted}
          style={{
            ...buttonStyles,
            backgroundColor: isSubmitted ? 'gray' : '#28a745', // Custom color with gray when submitted
            cursor: isSubmitted ? 'not-allowed' : 'pointer',
          }}
        >
          {isSubmitted ? 'Submitted' : 'Submit'}
        </button>

        {/* Conditionally Render the Upload Photo Button */}
        {showUploadButton && (
          <Link
            to={`/updatePhoto/${id}`}
            style={{
              ...buttonStyles,
              backgroundColor: '#CBD6E2', // Original blue background
            }}
          >
            Update Photo
          </Link>
        )}

        {/* Return to Home Button */}
        <Link
          to="/"
          style={{
            ...buttonStyles,
            backgroundColor: '#CBD6E2', // Original blue background
          }}
        >
          Return to Home
        </Link>
      </div>
    </form>
  );
}