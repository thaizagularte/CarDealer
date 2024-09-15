import { Link, Outlet } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <nav style={styles.nav}>
          <Link to='/home' style={styles.link}>Home</Link>
          <Link to='/listVehicles' style={styles.link}>Lista de Veículos</Link>
        </nav>
      </header>
        <Outlet />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  header: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #444',
  },
  nav: {
    display: 'flex',
    gap: '15px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'color 0.3s',
  },
  linkHover: {
    color: '#f39c12',
  },
  heading: {
    margin: '0',
    fontSize: '24px',
    color: '#333',
  },
};

export default App;
