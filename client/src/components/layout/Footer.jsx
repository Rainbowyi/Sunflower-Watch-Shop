import { Link } from 'react-router-dom';
import * as styles from './Footer.css';

function Footer() {
  return (
    <div className={styles.footer}>
      <p className={styles.paragraph}>SUBSCRIBE TO
OUR NEWSLETTER</p>

  <Link className={styles.signup} to="/signup">Subscribe</Link>
    </div>
  );
}

export default Footer;
