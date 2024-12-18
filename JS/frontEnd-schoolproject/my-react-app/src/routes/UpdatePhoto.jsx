import React, { useState } from 'react';
import FileUpload from '../ui/FileUpload';
import { useParams } from 'react-router-dom'; 

export default function UpdatePhoto() {
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState(null);
  const { id } = useParams(); 

  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = `${apiHost}/api/photo/update`; 

  const handleUpload = async (file) => {
    setIsUploading(true);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id); 

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        setStatus('Photo updated successfully!');
      } else {
        setStatus('Error updating the photo.');
      }
    } catch (error) {
      setStatus('Error updating the photo.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setStatus('Upload cancelled');
  };

  return (
    <div>
      <h1>Update Photo</h1>
      <FileUpload
        onSubmit={handleUpload}
        isUploading={isUploading}
        onCancel={handleCancel}
      />
      {status && <p>{status}</p>}
    </div>
  );
}