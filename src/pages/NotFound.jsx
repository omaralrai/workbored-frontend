import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container" style={{ padding: '64px', textAlign: 'center' }}>
      <h1>404</h1>
      <p className="muted">Page not found.</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: '16px' }}>Go home</Link>
    </div>
  );
};

export default NotFound;
