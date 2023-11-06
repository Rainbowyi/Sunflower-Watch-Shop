import { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import TuBox from '../components/common/TuBox';

const Home = () => {
  return (
    <Fragment>
      <Container>
        <TuBox
          title='Sunflower Watch Shop'
          content="Find the Best Watch suitable for you"
          link='Shop Now'
          linkTo='/store/products'
        />
      </Container>
      
    </Fragment>
  );
};

export default Home;
