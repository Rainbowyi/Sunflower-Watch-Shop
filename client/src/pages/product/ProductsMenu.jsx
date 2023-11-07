import { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import useAuth from '../../hooks/useAuth';
import TuLink from '../../components/common/TuLink';
import productService from '../../services/productService';
import ProductsList from '../../components/features/products/ProductsList';
import TuLoader from '../../components/common/TuLoader';
import axios from 'axios';

function ProductsPage() {
  // PRODUCTS STATE
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // HOOK: ON-LOAD SIDE EFFECTS
  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === false) {
      fetchProducts();
      setLoading(false);

      // CLEAN UP FUNCTION
      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  async function fetchProducts() {
    try {
      const res = await axios.get('http://localhost:5500/api/products');
      const data = await res.data;
      console.log(data);
      setData(data);
    } catch (err) {
      console.log(err);
      setError(true);
      // toast.error('Internal Server Error');
    }
  }

  // CONDITIONAL LOAD: ERROR
  if (error) {
    return (
      <Container className='text-center mt-4'>
        <p>Error page</p>
      </Container>
    );
  }

  // CONDITIONAL LOAD: LOADING
  if (loading) {
    return (
      <Container className='text-center mt-4'>
        <TuLoader />
      </Container>
    );
  }

  return (
    <Container className='text-center mt-4'>
      <h2>Sunflower Queen</h2>
      <p>
        <em>Watch Shop</em>
      </p>
      {/* Admin Section:Add page */}
      {user && (
        <div className='py-4'>
          <TuLink to='/store/product/add'>Add Product</TuLink>
        </div>
      )}
      {/* Products Menu */}
      {<ProductsList products={data} />}
    </Container>
  );
}

export default ProductsPage;
