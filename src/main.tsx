<<<<<<< HEAD

import { createRoot } from 'react-dom/client'
import { ClerkProvider } from "@clerk/clerk-react"
import App from './App.tsx'
import './index.css'

// IMPORTANT: Make sure to replace this with the VITE_CLERK_PUBLISHABLE_KEY value
const PUBLISHABLE_KEY = "pk_test_cmVzb2x2ZWQtd2Fob28tMjUuY2xlcmsuYWNjb3VudHMuZGV2JA"
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing CLERK_PUBLISHABLE_KEY. Please add it to your environment variables.");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider
    publishableKey={PUBLISHABLE_KEY}
    clerkJSVersion="5.56.0-snapshot.v20250312225817"
    signInUrl="/login"
    signUpUrl="/register"
    signInFallbackRedirectUrl="/"
    signUpFallbackRedirectUrl="/"
    afterSignOutUrl="/login"
  >
    <App />
  </ClerkProvider>
);
=======
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
>>>>>>> 549599ad9937a4de19c036d251ff596d1b2b0f9b
