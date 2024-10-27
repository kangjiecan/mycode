import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Create() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = `${apiHost}/api/photo/create`;

  const handleCreate = async () => {
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
    <div className="container mt-5">
      <h1 className="text-center">Create New Photo Post</h1>

      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleCreate();
        }}
        className="mx-auto" 
        style={{ maxWidth: '400px' }}
      >
        {/* Title Field */}
        <div className="mb-3">
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
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            style={{ height: '150px' }}
            required
          />
        </div>

        {/* File Upload */}
        <div className="mb-3">
          <label className="form-label">Upload Photo:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="form-control"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn ${isSubmitting ? 'btn-secondary' : 'btn-success'} w-100`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {/* Status Message */}
      {status && <p className="mt-3 text-center">{status}</p>}
    </div>
  );
}