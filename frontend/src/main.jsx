import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import Home from './routes/Home.jsx'
import AddTask from './routes/AddTask.jsx'
import EditTask from './routes/EditTask.jsx'
import ListVehicles from './routes/ListVehicles.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
          path: "/listVehicles",
          element: <ListVehicles/>
      },
      {
        path: "/add",
        element: <AddTask />
      },
      {
        path: "/edit/:id",
        element: <EditTask />
      }
    ]
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)