import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import CardDetail from '../../components/CardDetail/CardDetail';
import Spinner from '../../components/Spinner/Spinner';

// FIREBASE:
import { db } from '../../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

//CONTEXT
import { CartContext } from '../../context/CartContext';

const DetailProduct = () => {
  const {addToCart} = useContext(CartContext)
  const { id } = useParams();
  const [product, setProduct] = useState(null);


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ ...docSnap.data(), id: docSnap.id });
          setLoading(false);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      }
    };

    getProduct();
  }, [id]);

  if (!product) {
    if (!loading) {
      return <div>No se ha encontrado el producto.</div>;
    }
    return null; 
  }

  return (
      <div>
    
       {loading ? (
      <Spinner />
    ) : (<div style={{ width: '100%', height: '90vh', backgroundColor: '#e0b88d', paddingTop: 30 }}>
      <CardDetail product={product} addToCart={addToCart} />
      </div>)}
      
     </div>
  );
};

export default DetailProduct;
