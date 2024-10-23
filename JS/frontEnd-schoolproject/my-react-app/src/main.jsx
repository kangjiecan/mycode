import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './routes/Home';
//import Create from './routes/Create';
//import Create2 from './routes/Create2';
import Read from './routes/Read';
//import Update from './routes/Update';
//import Delete from './routes/Delete';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
/*  {
    path: "/create",
    element: <Create2 />
  },
  */
  {
    path: "/read/:id",
    element: <Read />
  },
  /*
  {
    path: "/update/:id",
    element: <Update />
  },
  {
    path: "/delete/:id",
    element: <Delete />
  },*/
]);

  
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
