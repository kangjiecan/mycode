import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Read() {
  const { id } = useParams(); // Get the photo ID from the URL
  const [photo, setPhoto] = useState(null);
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = `${apiHost}/api/photo/read/${id}`; // API to get a specific photo by ID

  useEffect(() => {
    async function fetchPhoto() {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        setPhoto(data);
      }
    }
    fetchPhoto();
  }, [apiUrl]);

  if (!photo) {
    return <p>Loading photo...</p>;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{photo.title}</h1>
      <h6>ID: {photo.id}</h6>
      <p>{photo.description}</p>

      {/* Image Container */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '20px' }}>
        <img 
          src={photo.path} 
          alt={photo.title} 
          style={{ maxWidth: '600px', width: '100%', height: 'auto', objectFit: 'contain' }} 
        />
      </div>

      {/* Return to Home Link */}
      <div style={{ marginTop: '10px' }}>
        <Link to="/" style={{ padding: '5px 10px', fontSize: '16px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Return
        </Link>
      </div>

      {/* Delete Photo Link */}
      <div style={{ marginTop: '10px' }}>
        <Link to={`/delete/${id}`} style={{ padding: '5px 10px', fontSize: '16px', backgroundColor: 'red', color: 'white', textDecoration: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Delete
        </Link>
      </div>

      {/* Update Photo Info Link */}
      <div style={{ marginTop: '10px' }}>
        <Link to={`/update/${id}`} style={{ padding: '5px 10px', fontSize: '16px', backgroundColor: 'green', color: 'white', textDecoration: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Update
        </Link>
      </div>
    </div>
  );
}