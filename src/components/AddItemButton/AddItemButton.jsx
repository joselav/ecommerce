import React, { useState } from 'react';

//FIREBASE
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

import './AddItemButton.css'
    
const AddItemButton = ({product, addToCart}) => {
    const [count, setCount] = useState(0);
    const isMinReached = count <= 0;


    const incremento = () => {
        setCount(count + 1);
    };

    const disminucion = () => {
        if(count > 0){
            setCount(count-1);
        } else {};
    };

    const addCarrito = async () => {
      if (count > 0) {
        const productRef = doc(db, 'products', product.id);
        const productSnapshot = await getDoc(productRef);
        const stock = productSnapshot.data().stock;
    
        if (stock === 0) {
          console.log('No hay stock disponible para este producto');
          return;
        }
    
        if (count > stock) {
          console.log('La cantidad seleccionada supera el stock disponible');
          return;
        }
    
        const newStock = stock - count;
        await updateDoc(productRef, { stock: newStock });
    
        console.log(`Añadir al carrito: ${count} productos`);
    
        setCount(0);
    
        // Obtiene los productos del localStorage (si existen) o inicializa un array vacío
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
        // Agrega el producto actual al array de productos del carrito
        const newCartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: +count,
          image: product.image,
        };
        addToCart(newCartItem);
        cartItems.push(newCartItem);
    
        // Guarda los productos actualizados en el localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }
    };

     
    

  return (
    <div className='addItem'>
      <div className='mb'> 
         <button className={`bmp ${count == 0 ? 'hover-disabled': ''}`} onClick={disminucion} disabled={isMinReached}>-</button>
         <span className='number'>{count}</span>
         <button className={`bmp ${count >= product.stock ? 'hover-disabled' : ''}`} onClick={incremento}>+</button>
      </div>
      <div className="addm">
        <button className={ `add ${count == 0 ? 'hover-disabled': ''}`} onClick={addCarrito}>Añadir al carrito</button>
      </div>
    </div>
  )
}

export default AddItemButton
