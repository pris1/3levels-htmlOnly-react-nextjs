import { NavLink } from 'react-router-dom';

const navLinkStyles = ({ isActive }) => ({
  color: isActive ? '#007bff' : '#333',
  textDecoration: isActive ? 'none' : 'underline',
  fontWeight: isActive ? 'bold' : 'normal',
  padding: '5px 10px',
});

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          {' '}
          <NavLink to="/" style={navLinkStyles}>
            Home
          </NavLink>
        </li>
        <li>
          {' '}
          <NavLink to="/about" style={navLinkStyles}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" style={navLinkStyles}>
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
