import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = `${apiHost}/api/photo/all`;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        if (!ignore) {
          setPosts(data.images);
        }
      } else {
        setPosts(null);
      }
    }
    let ignore = false;
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="container mt-5">
      {/* Title and Add New button row */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Photo Gallery</h1>
        <Link to="/create" className="btn btn-sm" style={{ backgroundColor: '#CBD6E2', color: 'white' }}>
          Add New
        </Link>
      </div>
      
      <div className="row">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="col-md-3 mb-4">
              <div className="card" style={{ height: '400px' }}>
                <img
                  src={post.path}
                  alt={post.title}
                  className="card-img-top"
                  style={{ height: '150px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{post.title}</h5>
                  
                  <p className="card-text" style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3, 
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {post.description}
                  </p>

                  {/* Buttons in the same row */}
                  <div className="mt-auto d-flex justify-content-between">
                    <Link to={`/read/${post.id}`} className="btn btn-sm" style={{ backgroundColor: '#CBD6E2', color: 'white' }}>
                      View
                    </Link>
                    <Link to={`/update/${post.id}`} className="btn btn-sm" style={{ backgroundColor: '#CBD6E2', color: 'white' }}>
                      Update
                    </Link>
                    <Link to={`/delete/${post.id}`} className="btn btn-sm" style={{ backgroundColor: '#CBD6E2', color: 'white' }}>
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No posts found.</p>
        )}
      </div>
    </div>
  );
}