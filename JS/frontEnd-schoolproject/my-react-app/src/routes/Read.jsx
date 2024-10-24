import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Read() {
  const { id } = useParams(); 
  const [photo, setPhoto] = useState(null);
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = `${apiHost}/api/photo/read/${id}`; 

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
    <div className="container text-center mt-5">
      <h1>{photo.title}</h1>
      <h6>ID: {photo.id}</h6>
      <p>{photo.description}</p>

      {/* Image Container */}
      <div className="d-flex justify-content-center align-items-center mt-4">
        <img 
          src={photo.path} 
          alt={photo.title} 
          className="img-fluid" 
          style={{ maxWidth: '600px', objectFit: 'contain' }} 
        />
      </div>

      {/* Buttons Container */}
      <div className="d-flex justify-content-center gap-3 mt-5">
        {/* Return to Home Link */}
        <Link 
          to="/" 
          style={{ 
            padding: '10px 20px', 
            fontSize: '10px', 
            backgroundColor: '#CBD6E2', // Retain your custom color
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}>
          Return
        </Link>

        {/* Delete Photo Link */}
        <Link 
          to={`/delete/${id}`} 
          style={{ 
            padding: '10px 20px', 
            fontSize: '10px', 
            backgroundColor: '#CBD6E2', // Retain your custom color
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}>
          Delete
        </Link>

        {/* Update Photo Info Link */}
        <Link 
          to={`/update/${id}`} 
          style={{ 
            padding: '10px 20px', 
            fontSize: '10px', 
            backgroundColor: '#CBD6E2', // Retain your custom color
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}>
          Update
        </Link>
      </div>
    </div>
  );
}