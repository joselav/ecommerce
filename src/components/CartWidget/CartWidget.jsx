import React, { useEffect,useContext } from 'react';
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded';
import '../../assets/fonts.css';

//CONTEXT
import { CartContext } from '../../context/CartContext';

const CartWidget = () => {

  const {cartItemsCount} = useContext(CartContext);


  return (
    <div style={{ display: 'flex', width: '50px', height: '40px', margin: 'auto' }}>
      <LocalGroceryStoreRoundedIcon sx={{ color: 'white', alignItems: 'center', height: '40px' }} />
      <p style={{ fontFamily: "'Josefin Slab', serif", fontWeight: '700', color:"white"}}>{cartItemsCount}</p>
    </div>
  );
};

export default CartWidget;

