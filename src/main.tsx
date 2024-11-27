import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/sonner";
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider

const queryClient = new QueryClient();

// Your Google OAuth client ID
const  googleClientId='753505166444-m4se0oimp741gpv89pkdlsiv05a0hc21.apps.googleusercontent.com';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={googleClientId}> 
        <Toaster />
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);

