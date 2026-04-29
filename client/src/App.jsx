import './App.css'
import { RouterProvider } from 'react-router';
import router from "./Routers/main_R";

import { ToastProvider } from "./context/ToastContext.jsx";
import { ConfirmProvider } from 'material-ui-confirm';

import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

import { ThemeProvider } from '@mui/material';
import { theme } from './theme_params.jsx';
import { CssBaseline } from '@mui/material';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ConfirmProvider
        defaultOptions={{
          dialogProps: {

            sx: {
              '& .MuiPaper-root': {
                borderRadius: '12px',
              }
            }

          },
          confirmationButtonProps: {
            variant: 'contained',
          },
          cancellationButtonProps: {
            variant: 'outlined',
          }
        }}>
        <ToastProvider >
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <CssBaseline /> {/* This normalizes the styles */}
              <RouterProvider router={router} />
            </ThemeProvider>
          </CacheProvider>
        </ToastProvider>
      </ConfirmProvider>

    </QueryClientProvider >

  )
}

export default App
