import { useEffect, useState } from "react"

export default function Logout() {
  const [status, setStatus] = useState("Logging out...");
  
  useEffect(() => {
    // to-do
  }, []);
  return (
    <>
      <h1>Logout</h1>
      <p>{ status }</p>
    </>
  )
}