import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import App from './App';
import router from './router';
import { AuthContextProvider } from './store/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
  </AuthContextProvider>
);

