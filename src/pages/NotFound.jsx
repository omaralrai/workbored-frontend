import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container page-placeholder center">
      <h1>404</h1>
      <p className="muted">Page not found.</p>
      <Link to="/" className="btn btn-primary btn-home">Go home</Link>
    </div>
  );
};

export default NotFound;
