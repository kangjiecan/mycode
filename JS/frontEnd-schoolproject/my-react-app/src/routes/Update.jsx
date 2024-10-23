import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Update() {
  const { id } = useParams(); // Get the photo ID from the URL

  // State variables to store title and description
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(null); // For success or error messages
  const [isSubmitted, setIsSubmitted] = useState(false); // To disable the button after the first click

  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = `${apiHost}/api/photo/updateInfo`; // API to update the photo info

  // Pre-fill the form with the current title and description (if needed)
  useEffect(() => {
    async function fetchPhoto() {
      const response = await fetch(`${apiHost}/api/photo/read/${id}`);
      if (response.ok) {
        const data = await response.json();
        setTitle(data.title); // Set the current title
        setDescription(data.description); // Set the current description
      }
    }
    fetchPhoto();
  }, [id, apiHost]);

  // Handle form submission for updating the photo info
  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    setIsSubmitted(true); // Disable the button after the first click
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id, // Send the photo ID
          title,
          description,
        }),
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

      <form onSubmit={handleUpdate}>
        <div style={{ marginBottom: '20px' }}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: '10px', width: '300px', marginLeft: '10px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ padding: '10px', width: '300px', height: '100px', marginLeft: '10px' }}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitted} // Disable the button after the first click
          style={{
            padding: '10px 20px',
            backgroundColor: isSubmitted ? 'gray' : '#28a745',
            color: 'white',
            cursor: isSubmitted ? 'not-allowed' : 'pointer',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          {isSubmitted ? 'Submitted' : 'Submit'} {/* Change button text when submitted */}
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

      {/* Link to Update Photo (UpdatePhoto.jsx) */}
      <div style={{ marginTop: '20px' }}>
        <Link
          to={`/updatePhoto/${id}`} // Navigate to UpdatePhoto.jsx with the id
          style={{
            padding: '10px 20px',
            backgroundColor: 'green',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
          }}
        >
          Update Photo
        </Link>
      </div>
    </div>
  );
}