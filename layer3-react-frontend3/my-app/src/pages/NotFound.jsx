import { Link } from 'react-router-dom';
// NotFound component directly in App.js
function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go back home</Link>
    </div>
  );
}

export default NotFound;
