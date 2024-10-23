import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function UpdatePhoto() {
  const { id } = useParams(); // Get the photo ID from the URL

  // State for the photo file and status messages
  const [file, setFile] = useState(null); // State to hold the file
  const [status, setStatus] = useState(null); // To show success or error messages
  const [isUploading, setIsUploading] = useState(false); // To disable the button after the first click

  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = `${apiHost}/api/photo/update`; // API to update the photo

  // Handle form submission for uploading the photo
  const handleUpload = async (e) => {
    e.preventDefault(); // Prevent page reload
    setIsUploading(true); // Disable the button after the first click

    const formData = new FormData();
    formData.append('file', file); // Add the file from the input
    formData.append('id', id); // Add the photo ID

    // Log the formData contents
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        body: formData, // Send the formData object (multipart/form-data)
      });

      if (response.ok) {
        setStatus('Photo updated successfully!');
      } else {
        setStatus('Error updating the photo.');
      }
    } catch (error) {
      setStatus('Error updating the photo.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Update Photo</h1>

      <form onSubmit={handleUpload}>
        <div style={{ marginBottom: '20px' }}>
          <label>Choose a Photo:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])} // Update the file from input
            style={{ padding: '10px', marginLeft: '10px' }}
            required
          />
        </div>

        {/* Upload Button */}
        <button
          type="submit"
          disabled={isUploading} // Disable the button after first click
          style={{
            padding: '10px 20px',
            backgroundColor: isUploading ? 'gray' : '#28a745',
            color: 'white',
            cursor: isUploading ? 'not-allowed' : 'pointer',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          {isUploading ? 'Uploading...' : 'Upload Photo'} {/* Change button text while uploading */}
        </button>
      </form>

      {/* Show success or error status */}
      {status && <p style={{ marginTop: '20px' }}>{status}</p>}

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