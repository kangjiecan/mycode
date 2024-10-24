import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PhotoInfoForm from '../ui/PhotoInfoForm'; 

export default function Update() {
  const { id } = useParams(); 
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [status, setStatus] = useState(null); 
  const [initialData, setInitialData] = useState({ title: '', description: '' }); 

  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = `${apiHost}/api/photo/updateInfo`; 

  // Pre-fill the form with the current title and description (if needed)
  useEffect(() => {
    async function fetchPhoto() {
      const response = await fetch(`${apiHost}/api/photo/read/${id}`);
      if (response.ok) {
        const data = await response.json();
        setInitialData({ title: data.title, description: data.description }); // Set the current title and description
      }
    }
    fetchPhoto();
  }, [id, apiHost]);

  
  const handleUpdate = async ({ title, description }) => {
    setIsSubmitted(true); 
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, title, description }), 
      });

      if (response.ok) {
        setStatus('Photo info updated successfully!');
      } else {
        setStatus('Error updating the photo.');
      }
    } catch (error) {
      setStatus('Error updating the photo.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Update Photo Info</h1>

      {/* Use the PhotoInfoForm component to handle input */}
      <PhotoInfoForm
        initialTitle={initialData.title}
        initialDescription={initialData.description}
        onSubmit={handleUpdate}
        isSubmitted={isSubmitted}
        id={id} // Pass the photo ID for the "Upload Photo" link
      />

      {/* Show success or error status */}
      {status && <p style={{ marginTop: '20px' }}>{status}</p>}
    </div>
  );
}