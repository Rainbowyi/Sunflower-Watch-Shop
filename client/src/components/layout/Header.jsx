import * as styles from './Header.css';

import useAuth from '../../hooks/useAuth';
import TuButton from '../common/TuButton';
import TuLink from '../common/TuLink';

import { Link } from 'react-router-dom';
import { Container, Navbar, Nav,Dropdown } from 'react-bootstrap';
import { RiShoppingCartFill } from 'react-icons/ri';
import { FiUsers } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
const Header = () => {
  // ACCESS VARIABLES FROM HOOKS
  const { user, logout } = useAuth();

  return (
    <Navbar className={styles.navbar} variant='light' expand='lg' sticky='top'>
      <Container>
        <Navbar.Brand className={styles.brandLink} as={Link} to='/'>
         
          <div className={styles.logoTextBox}>
            <span className={styles.brand}>Sunflower Queen Watch Shop</span>
            <span className={styles.brandSub}>The Official Online Store</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
         <div className={styles.dropdownDiv}> 
         <Dropdown>
      <Dropdown.Toggle variant="info" id="dropdown-basic">
        <FiUsers/>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/login">Log In</Dropdown.Item>
        <Dropdown.Item href="/signup">Sign In</Dropdown.Item>
        <Dropdown.Item href="/">Home</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown>
      <Dropdown.Toggle variant="info" id="dropdown-basic">
        <AiOutlineShoppingCart/>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/store/products">Buy Now</Dropdown.Item>
        
       
      </Dropdown.Menu>
    </Dropdown></div>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
