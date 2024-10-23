import { useState } from 'react';

export default function FileUploadComponent({ onSubmit, isUploading, buttonText = "Upload", cancelButtonText = "Cancel", onCancel }) {
  const [file, setFile] = useState(null); // State to hold the selected file

  // Handle the file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store the selected file
  };

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onSubmit(file); // Call the provided onSubmit function with the selected file
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center', marginTop: '50px' }}>
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
        disabled={isUploading} // Disable the button while uploading
        style={{
          padding: '10px 20px',
          backgroundColor: isUploading ? 'gray' : '#28a745',
          color: 'white',
          cursor: isUploading ? 'not-allowed' : 'pointer',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        {isUploading ? 'Uploading...' : buttonText}
      </button>

      {/* Cancel Button */}
      {onCancel && (
        <button
          type="button"
          onClick={onCancel} // Call the cancel function if provided
          style={{
            padding: '10px 20px',
            marginLeft: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {cancelButtonText}
        </button>
      )}
    </form>
  );
}