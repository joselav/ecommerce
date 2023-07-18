import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import '../../assets/fonts.css'
import './ItemListContainer.css'

import Spinner from '../../components/Spinner/Spinner'

import CardsProducts from '../../components/CardsProducts/CardsProducts';

///FIREBASE
import { db } from '../../firebase/firebaseConfig';
import { collection, query, getDocs } from 'firebase/firestore'


const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const q = query(collection(db, "products"));
      const docs = [];
      const querySnapshot = await getDocs(q);
      //console.log(querySnapshot);
      querySnapshot.forEach((doc)=> {
        //console.log(doc.id, " => ", doc.data());
        docs.push({ ...doc.data(), id: doc.id });
      })
      setProducts(docs);
      setLoading(false);
    };
    
    getProducts();
  }, []);

  return (
    <div className='all'>
      <div className='listaP'>
      {loading ? (
          <Spinner sx={{margin: 150, marginTop: 40}} />
        ) : (
          products.map((product) => (
            <div key={product.id}>
              <Link to={`item/${product.id}`} style={{ textDecoration: 'none' }}>
                <CardsProducts product={product} />
              </Link>
            </div>
          ))
        )}
          
      </div>
    </div>
  )
}

export default ItemListContainer