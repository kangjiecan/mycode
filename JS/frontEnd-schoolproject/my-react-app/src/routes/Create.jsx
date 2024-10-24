import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhotoInfoForm from '../ui/PhotoInfoForm';

export default function Create() {
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = `${apiHost}/api/photo/create`;

  const handleCreate = async ({ title, description }) => {
    if (!file) {
      setStatus('Please upload a file.');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('customName', file.name);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('Photo created successfully!');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setStatus('Error creating the photo.');
      }
    } catch (error) {
      setStatus('Error creating the photo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1>Create New Post</h1>
      <PhotoInfoForm
        initialTitle=""
        initialDescription=""
        onSubmit={handleCreate}
        isSubmitted={isSubmitting}
        showUploadButton={false}
      />
      <div className="mt-3">
        <input
          type="file"
          onChange={handleFileChange}
          className="form-control"
          style={{ width: '300px' }}
          required
        />
      </div>
      {status && <p className="mt-3">{status}</p>}
    </div>
  );
}