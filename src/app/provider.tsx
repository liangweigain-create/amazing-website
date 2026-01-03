import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export const AppProvider = () => {
  return (
    <React.StrictMode>
       {/* 这里未来可以加 ThemeProvider, QueryClientProvider 等 */}
       <RouterProvider router={router} />
    </React.StrictMode>
  );
};