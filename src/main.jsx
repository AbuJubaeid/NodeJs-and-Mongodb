import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from './App.jsx';
import UserDetails from './components/UserDetails.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: 'user/:id',
    loader: ({params})=>fetch(`http://localhost:3000/users/${params.id}`),
    Component: UserDetails
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
)
