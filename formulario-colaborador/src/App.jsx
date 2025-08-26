import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import CollaboratorForm from './components/CollaboratorForm';
import Login from './components/templates/Login/Login.jsx';
import Header from './components/templates/Header.jsx';
import Footer from './components/templates/Footer.jsx';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && <Header username={user} />}
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              !user ? <Login onLogin={setUser} /> : <CollaboratorForm />
            }
          />
          <Route path="/collaborator-form" element={<CollaboratorForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}