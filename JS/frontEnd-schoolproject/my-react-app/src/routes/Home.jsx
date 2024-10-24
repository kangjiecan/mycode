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
    <div className="container py-4">
      {" "}
      {/* Bootstrap container and padding */}
      {/* Title and button aligned */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        {" "}
        {/* Bootstrap flex utilities */}
        <h3>All POST</h3>
        {/* Add New Photo Button */}
        <Link
          to="/create"
          className="btn btn-success btn-sm" // Bootstrap button classes
        >
          Add New
        </Link>
      </div>
      {/* Display the posts */}
      <div className="row g-5">
        {" "}
        {/* Bootstrap row */}
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="col-md-2 mb-4">
              {" "}
              {/* Bootstrap grid system and margin-bottom */}
              {/* Wrap the image in a Link */}
              <Link to={`/read/${post.id}`} className="text-decoration-none">
                <div
                  className="card"
                  style={{
                    width: "200px", // Correctly set the width
                    height: "300px", // Correctly set the height
                    overflow: "hidden", // Ensure overflow is hidden
                  }}
                >
                  {/* Ensure you're rendering children correctly */}
                  <img
                    src={post.path}
                    alt={post.title}
                    className="card-img-top"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">ID: {post.id}</h5>
                    <p className="card-text">{post.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
}
