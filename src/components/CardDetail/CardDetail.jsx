import React from 'react'
import "./CardDetail.css"

import AddItemButton from '../AddItemButton/AddItemButton';


const CardDetail = ({product, addToCart}) => {
    const producto = product;

    let stockMessage = "";

    if(producto.stock <=10 & producto.stock > 5) {
        stockMessage = "¡Últimas 10 unidades!"
    } else if(producto.stock <= 5 & producto.stock > 0){
        stockMessage = "¡Últimas 5 unidades!"
    } else if(producto.stock === 0){
        stockMessage = "¡Lo sentimos! No hay stock de este producto."
    }
    

  return (
    <div className='container'>
       <div className='container-left'>
        <div className='container-left-c-img'>
            <div className='container-left-c-c-img'>
                <img src={producto.image} alt={producto.name} className='container-left-img'/>
            </div>
         </div>
       </div>
       <div className='container-right'>
        <div className='container-right-c-txt'>
            <div className='container-righ-c-txt-t'>
                <h2>{producto.name}</h2>
            </div>
            <div className='container-right-c-txt-des'>
                <p>{producto.detail}</p>
            </div>
            <div className='container-right-c-txt-p'>
                <h3>PRECIO: €{producto.price}</h3>
            </div>
            <div className='container-right-c-txt-stock'>
            {stockMessage ? <p style={{color:"red", margin:"auto"}}>{stockMessage}</p> : null}
            </div>
            <AddItemButton product={product} addToCart={addToCart}></AddItemButton>

        </div>
       </div>
    </div>
  )
}

export default CardDetail