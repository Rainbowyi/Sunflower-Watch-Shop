import { Fragment } from 'react';
import tissot from "../../public/tissot.png"
import * as styles from './Home.css'
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <Fragment>
      <div >
      <div className={styles.pic}>
        <img  src={tissot} alt="tissot watch" />
        
      </div>
      <div className={styles.title}><h1 >Sunflower Queen Watch</h1>
      <span>Switzerland Since 1853</span>
      <Link  className={styles.btnLink} to="/store/products"><button className={styles.btn}>Buy Now</button></Link>
      </div>
      
      </div>
    </Fragment>
  );
};

export default Home;
