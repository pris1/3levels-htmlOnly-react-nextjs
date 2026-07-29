import { Link } from 'react-router-dom';

import Contact from '../../pages/Contact';
import PrivacyPolicy from '../../pages/PrivacyPolicy';
import TermsOfService from '../../pages/TermsOfService';

function Footer() {
  <p>&copy; 2025 SMART FRIDGE Corporation. All Rights Reserved.</p>;
  return (
    <div className="footer">
      <div className="footer-links">
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms of Service</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
    </div>
  );
}

export default Footer;
