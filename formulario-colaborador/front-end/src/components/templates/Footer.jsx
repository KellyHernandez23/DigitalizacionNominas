function Footer() {
  return (
    <footer className="footer" style={{
      position: 'relative',
      bottom: 0,
      width: '100%',
      padding: '1rem 0',
      marginTop: 'auto'
      //backgroundColor: '#f5f5f5' // Opcional: para que tenga un fondo
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <p style={{ fontSize:'0.875rem', color:'#7C7C7C'}}>Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;