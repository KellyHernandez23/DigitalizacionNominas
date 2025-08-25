import CollaboratorForm from './components/CollaboratorForm';
import './App.css';
import { Menu } from '@mui/material';
import Header from './components/templates/Header.jsx';
import Footer from './components/templates/Footer.jsx';
import React, {useState} from 'react';
import Login from './components/templates/Login/Login.jsx';

function App() {
  const [user, setUser] = useState(null);
  if(!user) {
    return <Login onLogin={setUser} />;
  }
  return (
    <div>
      <div className="App">
      <Header username={user}/>
      <main className="main-content">
        <section className="section">
          <CollaboratorForm />
        </section>
      </main>
      <Footer />
    </div>
    </div>
  )
}

export default App;
