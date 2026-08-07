import { Link } from 'react-router-dom';
import Button from '../ui/Button';

function Footer() {
  return (
    <div className="footer">
      <p>&copy; 2025 SMART FRIDGE Corporation. All Rights Reserved.</p>
      <Button />
      <div className="footer-links">
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms of Service</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
    </div>
  );
}

export default Footer;
