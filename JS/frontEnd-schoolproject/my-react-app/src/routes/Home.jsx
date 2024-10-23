import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
  const [contacts, setContacts] = useState([]); // initialize as empty array
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = `${apiHost}/api/photo/all`;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(apiUrl); 
      if(response.ok){
        const data = await response.json();
        if (!ignore) { 
          setContacts(data.images); // Access the images array from the API response
        }
      } else {
        setContacts(null);
      }
    }
    let ignore = false;
    fetchData();
    return () => {
       ignore = true;
    }
  }, []); // run only once

  return (
    <>
      <h1>All Photos</h1>
      <Link to="/create" className="btn btn-outline-secondary">Add New Photo</Link>
      <div>
        {
          contacts.length > 0 ? 
          contacts.map(contact => (
            <div key={contact.id} style={{ margin: '10px', display: 'inline-block', textAlign: 'center' }}>
              {/* Wrap the image in a Link to route to Read.jsx and pass the ID */}
              <Link to={`/read/${contact.id}`}>
                <img 
                  src={contact.path} 
                  alt={contact.title} 
                  style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '5px' }} 
                />
              </Link>
              <h2 style={{ fontSize: '1em', margin: '5px 0' }}>ID: {contact.id}</h2>
              <h2 style={{ fontSize: '1em', margin: '5px 0' }}>{contact.title}</h2>
              <p style={{ fontSize: '0.8em', color: '#555' }}>{contact.description}</p>
            </div>
          )) : 
          <p>No photos found.</p>
        }
      </div>
    </>
  )
}