import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from '../src/context/AuthContext.jsx';
import CollaboratorForm from './components/CollaboratorForm';
import Login from './components/templates/Login/Login.jsx';
import Header from './components/templates/Header.jsx';
import Footer from './components/templates/Footer.jsx';
import ProtectedRoute from '../src/components/ProtectedRoute.jsx'
import Home from './components/Home.jsx';
import './App.css';

function AppContent() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <div className="app">
      {/* Header se muestra automáticamente cuando no está en la página de login */}
      <Header />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              !isAuthenticated ? <Login /> : <Home />
            }
          />
          <Route 
            path="/collaborator-form" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}