import { useState } from 'react';
import { Link } from 'react-router-dom'; 

export default function FileUpload({ onSubmit, isUploading, buttonText = 'Upload Photo', onCancel }) {
  const [file, setFile] = useState(null); 
  const [isSubmitted, setIsSubmitted] = useState(false); 

  // Handle the file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setIsSubmitted(false); 
  };

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      setIsSubmitted(true); 
      onSubmit(file); 
    }
  };

  return (
    <div className="container text-center mt-5">
      <form onSubmit={handleSubmit}>
        {/* File Input */}
        <div className="mb-3">
          <label className="form-label">Choose a Photo:</label>
          <input
            type="file"
            onChange={handleFileChange} // Update the file state
            className="form-control d-inline-block w-auto ms-3" // Bootstrap form control and spacing
            required
          />
        </div>

        {/* Upload Button */}
        <button
          type="submit"
          disabled={isUploading || isSubmitted} // Disable the button after first click or while uploading
          style={{
            padding: '10px 20px',
            backgroundColor: isUploading || isSubmitted ? 'gray' : '#28a745', // Custom green color
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
              marginLeft: '10px', // Bootstrap margin for spacing
              backgroundColor: isSubmitted ? 'gray' : '#CBD6E2', // Custom blue color
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
      <div className="mt-4">
        <Link
          to="/"
          style={{
            padding: '10px 20px',
            backgroundColor: '#CBD6E2', // Custom blue color
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
          }}
        >
          Return
        </Link>
      </div>
    </div>
  );
}