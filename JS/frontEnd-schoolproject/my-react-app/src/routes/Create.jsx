import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PhotoInfoForm from '../ui/PhotoInfoForm'; // Import the reusable PhotoInfoForm component

export default function Create() {
  const [file, setFile] = useState(null); // State to store the uploaded file
  const [isSubmitting, setIsSubmitting] = useState(false); // To disable the button after first click
  const [status, setStatus] = useState(null); // For success or error messages

  const navigate = useNavigate(); // To navigate after creation
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = `${apiHost}/api/photo/create`; // API endpoint for creating a photo

  // Handle form submission for creating a photo
  const handleCreate = async ({ title, description }) => {
    if (!file) {
      setStatus('Please upload a file.');
      return;
    }

    setIsSubmitting(true); // Disable the button after the first click

    const formData = new FormData();
    formData.append('file', file); // Append the file
    formData.append('customName', file.name); // Add custom file name (optional, based on curl command)
    formData.append('title', title); // Append the title
    formData.append('description', description); // Append the description

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData, // Send the form data as multipart/form-data
      });

      if (response.ok) {
        setStatus('Photo created successfully!');
        setTimeout(() => navigate('/'), 2000); // Redirect to home after 2 seconds
      } else {
        setStatus('Error creating the photo.');
      }
    } catch (error) {
      setStatus('Error creating the photo.');
    } finally {
      setIsSubmitting(false); // Re-enable the button after submission
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store the selected file
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Create New Photo</h1>

      {/* PhotoInfoForm for title and description */}
      <PhotoInfoForm
        initialTitle=""
        initialDescription=""
        onSubmit={handleCreate}
        isSubmitted={isSubmitting}
        showUploadButton={false} // Hide the Upload Photo button in this case
      />

      {/* File input for uploading a photo */}
      <div style={{ marginBottom: '20px' }}>
        <label>Upload Photo:</label>
        <input
          type="file"
          onChange={handleFileChange} // Update the file state
          style={{ padding: '10px', marginLeft: '10px' }}
          required
        />
      </div>

      {/* Show success or error status */}
      {status && <p style={{ marginTop: '20px' }}>{status}</p>}
    </div>
  );
}