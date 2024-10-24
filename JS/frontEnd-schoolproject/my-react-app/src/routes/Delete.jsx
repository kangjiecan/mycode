import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Delete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = `${apiHost}/api/photo/delete/${id}`;

  const handleDelete = async () => {
    setIsClicked(true);
    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
      });

      if (response.ok) {
        setStatus('Photo deleted successfully!');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setStatus('Error deleting the photo.');
      }
    } catch (error) {
      setStatus('Error deleting the photo.');
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1>Delete Post</h1>
      <p>Are you sure you want to delete the post with ID: {id}?</p>

      {status && <p>{status}</p>}

      <div className="d-flex justify-content-center gap-3 mt-4">
        <button
          onClick={handleDelete}
          disabled={isClicked}
          className="btn"
          style={{
            padding: '10px 20px',
            backgroundColor: isClicked ? 'gray' : 'red',
            color: 'white',
            cursor: isClicked ? 'not-allowed' : 'pointer',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          {isClicked ? 'Processing...' : 'Delete Photo'}
        </button>

        <button
          onClick={() => navigate('/')}
          className="btn"
          style={{
            padding: '10px 20px',
            backgroundColor: '#CBD6E2',
            color: 'white',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}