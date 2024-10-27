import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState(null);

  const apiHost = import.meta.env.VITE_API_HOST;
  const apiInfoUrl = `${apiHost}/api/photo/updateInfo`;
  const apiPhotoUrl = `${apiHost}/api/photo/update`;
  const apiReadUrl = `${apiHost}/api/photo/read/${id}`;

  useEffect(() => {
    async function fetchPhoto() {
      try {
        const response = await fetch(apiReadUrl);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setDescription(data.description);
        } else {
          setStatus('Error fetching photo information.');
        }
      } catch (error) {
        setStatus('Error fetching photo information.');
      }
    }
    fetchPhoto();
  }, [apiReadUrl]);

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(apiInfoUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, title, description }),
      });

      if (response.ok) {
        setStatus('Photo info updated successfully!');
      } else {
        setStatus('Error updating the photo info.');
      }
    } catch (error) {
      setStatus('Error updating the photo info.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus('Please select a file to upload.');
      return;
    }
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);

    try {
      const response = await fetch(apiPhotoUrl, {
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Update Photo, Title and Description</h1>

      <form onSubmit={handleUpdateInfo} className="mx-auto" style={{ maxWidth: '500px' }}>
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
          <label className="form-label">Upload New Photo:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="form-control"
            disabled={isUploading}
          />
        </div>

        {/* Buttons in a Row */}
        <div className="d-flex justify-content-between">
          {/* Submit Button */}
          <button
            type="submit"
            className="btn"
            disabled={isSubmitting}
            style={{ backgroundColor: '#CBD6E2', color: 'white', width: '32%' }}
          >
            {isSubmitting ? 'Updating Info...' : 'Update Info'}
          </button>

          {/* Upload Button */}
          <button
            type="button"
            onClick={handleUpload}
            className="btn"
            disabled={isUploading}
            style={{ backgroundColor: '#CBD6E2', color: 'white', width: '32%' }}
          >
            {isUploading ? 'Uploading Photo...' : 'Upload New Photo'}
          </button>

          {/* Return Button */}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn"
            style={{ backgroundColor: '#CBD6E2', color: 'white', width: '32%' }}
          >
            Return
          </button>
        </div>
      </form>

      {/* Status Message */}
      {status && <p className="mt-3 text-center">{status}</p>}
    </div>
  );
}