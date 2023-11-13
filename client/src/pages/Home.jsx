import { Fragment } from 'react';
import tissot from "../../public/tissot.png"
import * as styles from './Home.css'
const Home = () => {
  return (
    <Fragment>
      <div >
      <div className={styles.pic}>
        <img  src={tissot} alt="tissot watch" />
        
      </div>
      <div className={styles.title}><h1 >TISSOT</h1>
      <span>Switzerland Since 1853</span></div>
      </div>
    </Fragment>
  );
};

export default Home;
