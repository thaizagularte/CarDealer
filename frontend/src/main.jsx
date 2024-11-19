import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Home from './routes/Home.jsx';
import ListVehicles from './routes/ListVehicles.jsx';
import UserRegister from './routes/Register.jsx';
import Login from './components/Login.jsx';
import AddVehicle from './components/addVehicles.jsx'

const router = createBrowserRouter([
  {
    path: "/", // Rota principal
    element: <Login />, // Apenas o Login renderizado
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/listVehicles",
    element: <ListVehicles />,
  },
  {
    path: "/register",
    element: <UserRegister />, // Página de registro
  },
  {
    path: "/addCar",
    element: <AddVehicle />, // Página de registro
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
