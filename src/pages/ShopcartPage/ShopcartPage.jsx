import React, { useContext } from 'react';
import './ShopcartPage.css'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useNavigate } from 'react-router-dom';

//CONTEXT
import { CartContext } from '../../context/CartContext';

const ShopcartPage = () => {
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
      };

    const {cartItems, handleDecrement, handleEmptyCart, handleIncrement, handleRemove} = useContext(CartContext)
    const cartItemsList = cartItems.map((product) => (
        <div className="itemlist" key={product.id}>
            <div className="itemimg">
                <img src={product.image} alt={product.name} className='containerimg'/>
            </div>
            <div className="itemdetail">
                <h3>{product.name}</h3>
                <h5>{product.category}</h5>
            </div>
            <div className="itemquantity">
                <div className="btns"><button className="btnminus" onClick={() => handleDecrement(product.id)}>-</button></div>
                <div className="cant"><h3>CANTIDAD: {product.quantity}</h3></div>
                <div className="btns"><button className="btnmas" onClick={() => handleIncrement(product.id)}>+</button></div>      
            </div>
            <div className="itemprice">
                <h3>PRECIO: €{product.price*product.quantity}</h3>
            </div>
            <div className="itemdelete">
                <div className="deleteicon" onClick={() => handleRemove(product.id)}><DeleteForeverOutlinedIcon sx={{margin:"auto", height:60}} className="dlt" /></div>
            </div>
        </div>
    ));

    const total = cartItems.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);

    return (
        <div className='box'>
            <div className="titl">
                <h2 className='title'>Carrito de compras</h2>
            </div>
            <div className="itemcontainer">
                {cartItemsList}
            </div>
            <div className="checkout">
                <div className="btncheck">
                    <button className='btne' onClick={handleEmptyCart}> Vaciar Carrito </button>
                    <button className='btnch' onClick={handleCheckout}> Checkout </button>
                </div>
                <div className="full">
                    <p>TOTAL: €{total}</p>
                </div>
            </div>
        </div>
    );
}

export default ShopcartPage