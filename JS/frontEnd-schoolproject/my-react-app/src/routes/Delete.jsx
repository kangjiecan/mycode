import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Delete() {
  const { id } = useParams(); // Get the photo ID from the URL
  const navigate = useNavigate(); // For navigating back to home or other routes
  const [status, setStatus] = useState(null); // To track success or error
  const [isClicked, setIsClicked] = useState(false); // To disable the button after the first click

  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = `${apiHost}/api/photo/delete/${id}`; // API to delete a specific photo by ID

  const handleDelete = async () => {
    setIsClicked(true); // Disable the button after first click
    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
      });

      if (response.ok) {
        setStatus('Photo deleted successfully!');
        setTimeout(() => navigate('/'), 2000); // Redirect to home after 2 seconds
      } else {
        setStatus('Error deleting the photo.');
        // Button stays disabled after failure, no further interaction
      }
    } catch (error) {
      setStatus('Error deleting the photo.');
      // Button stays disabled after failure, no further interaction
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Delete Photo</h1>
      <p>Are you sure you want to delete the photo with ID: {id}?</p>

      {/* Show success or error status */}
      {status && <p>{status}</p>}

      <button
        onClick={handleDelete}
        disabled={isClicked} // Disable the button after first click
        style={{
          padding: '10px 20px',
          backgroundColor: isClicked ? 'gray' : 'red', // Change color if disabled
          color: 'white',
          cursor: isClicked ? 'not-allowed' : 'pointer',
          border: 'none',
          borderRadius: '5px',
          marginTop: '20px'
        }}
      >
        {isClicked ? 'Processing...' : 'Delete Photo'} {/* Change text when processing */}
      </button>

      <button
        onClick={() => navigate('/')}
        style={{
          padding: '10px 20px',
          marginLeft: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          cursor: 'pointer',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Cancel
      </button>
    </div>
  );
}