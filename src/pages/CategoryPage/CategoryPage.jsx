import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../../assets/fonts.css'
import './CategoryPage.css'

//component
import CardsProducts from '../../components/CardsProducts/CardsProducts'
import Spinner from '../../components/Spinner/Spinner'

//FIREBASE
import { db } from '../../firebase/firebaseConfig'
import { collection, query, where, getDocs } from 'firebase/firestore';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const q = query(collection(db, "products"), where("category", "==", categoryId));
      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProducts(productsData);
      setLoading(false);
    };

    getProducts();
  }, [categoryId]);

  const filter = products.filter((item) => {
    return item.category === categoryId;
  });

  const showCardCat = filter.length === 0;

  return (
    <div style={{ width: "100vw", height: "auto", backgroundColor: "#e0b88d", paddingTop: 10 }}>
      <div style={{ width: "100vw", height: "45px", backgroundColor: "#e0b88d", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
        
        <Link to={'/'} style={{ textDecoration: "none" }}>
          <div className='filter'>
            <h4 className='filterp'>Todos</h4>
          </div>
        </Link>

        <Link to={`/category/starwars`} style={{ textDecoration: "none" }}>
          <div className='filter'>
            <h4 className='filterp'>Star Wars</h4>
          </div>
        </Link>

        <Link to={`/category/animales`} style={{ textDecoration: "none" }}>
          <div className='filter'>
            <h4 className='filterp'>Animales</h4>
          </div>
        </Link>

        <Link to={`/category/varios`} style={{ textDecoration: "none" }}>
          <div className='filter'>
            <h4 className='filterp'>Varios</h4>
          </div>
        </Link>
      </div>
      {showCardCat}
      <div style={{ width: "100vw", height: "auto", display: 'grid', gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
      {loading ? (
          <Spinner />
        ) : (filter.map((product) => {
          return (
            <div key={product.id}>
              <Link to={`/item/${product.id}`} style={{ textDecoration: 'none' }}>
                <CardsProducts product={product} />
              </Link>
            </div>
          );
        }))}
        
      </div>
    </div>
  );
};

export default CategoryPage;
