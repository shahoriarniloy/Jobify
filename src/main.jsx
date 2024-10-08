import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";

import { router } from './Routes/router';
import AuthProvider from './Pages/Auth/CreateAccount/AuthContext';
import { ToastContainer } from 'react-toastify';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>

  </StrictMode>,
)
