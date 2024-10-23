import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link to navigate back to home

export default function FileUpload({ onSubmit, isUploading, buttonText = 'Upload Photo', onCancel }) {
  const [file, setFile] = useState(null); // State to hold the selected file
  const [isSubmitted, setIsSubmitted] = useState(false); // State to disable the button after first click

  // Handle the file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store the selected file
    setIsSubmitted(false); // Reset isSubmitted when a new file is selected
  };

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      setIsSubmitted(true); // Disable the buttons after the first click
      onSubmit(file); // Call the provided onSubmit function with the selected file
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label>Choose a Photo:</label>
          <input
            type="file"
            onChange={handleFileChange} // Update the file state
            style={{ padding: '10px', marginLeft: '10px' }}
            required
          />
        </div>

        {/* Upload Button */}
        <button
          type="submit"
          disabled={isUploading || isSubmitted} // Disable the button after first click or while uploading
          style={{
            padding: '10px 20px',
            backgroundColor: isUploading || isSubmitted ? 'gray' : '#28a745',
            color: 'white',
            cursor: isUploading || isSubmitted ? 'not-allowed' : 'pointer',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          {isUploading ? 'Uploading...' : isSubmitted ? 'Submitted' : buttonText}
        </button>

        {/* Optional Cancel Button */}
        {onCancel && (
          <button
            type="button"
            onClick={onCancel} // Call the cancel function if provided
            disabled={isSubmitted} // Disable after upload
            style={{
              padding: '10px 20px',
              marginLeft: '10px',
              backgroundColor: isSubmitted ? 'gray' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: isSubmitted ? 'not-allowed' : 'pointer',
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Return to Home Button */}
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