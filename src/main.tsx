
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StrictMode } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from 'next-themes'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <App />
      <Analytics />
    </ThemeProvider>
  </StrictMode>
);
