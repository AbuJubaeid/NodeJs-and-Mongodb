import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from './App.jsx';
import UpdateUser from './components/UpdateUser.jsx';
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
  },
  {
    path: 'update/:id',
    loader:({params})=>fetch(`http://localhost:3000/users/${params.id}`),
    Component: UpdateUser
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
)
