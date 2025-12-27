import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/comments/auth/Login'
import Header from './components/Header'

import './App.css'


import { AuthProvider } from './context/AuthContex';

import AppRoutes from './routes/AppRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

function App() {
  return (
  
      <AuthProvider>
     <BrowserRouter>
    <QueryClientProvider client={queryClient}>
        <AppRoutes />
    </QueryClientProvider>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;