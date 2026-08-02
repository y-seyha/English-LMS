import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import App from './App'
import './index.css'

const CLERK_KEY = (import.meta as any).env.VITE_CLERK_PUBLISHABLE_KEY ?? ''
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <ThemeProvider>
        <LanguageProvider>
          <ClerkProvider
            publishableKey={CLERK_KEY}
            appearance={{ variables: { colorPrimary: '#2563eb' } }}
          >
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </ClerkProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
