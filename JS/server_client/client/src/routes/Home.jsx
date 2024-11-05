import { useState, useEffect } from "react";

export default function Home(){
  const [user, setUser] = useState('');

  useEffect(() => {
    // to-do
  }, []);

  return (
    <>
      <h1>Home</h1>
      <p>User: {user}</p>
    </>
  )
}