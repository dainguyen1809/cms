import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

// route
import { routes } from './routes/index';

// context
import { ToastProvider } from './context/ToastContext';

// style
import './assets/css/index.css'
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
    <ToastProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </ToastProvider>
  //</StrictMode>,
)
