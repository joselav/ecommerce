import { useState, createContext, useEffect } from 'react'

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(
        JSON.parse(localStorage.getItem('cartItems')) || []
      );
    
      useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        setCartItems(cartItems);
      }, []);
    
      const cartItemsCount = cartItems.reduce(
        (total, product) => total + parseInt(product.quantity || 0, 10),
        0
      );
    
    
      //Agregar prod al carrito
      const addToCart = (product) => {
        const existingProduct = cartItems.find((item) => item.id === product.id);
      
        if (existingProduct) {
          // Actualizar la cantidad del producto existente
          existingProduct.quantity += product.quantity;
          setCartItems([...cartItems]); // Actualizar el estado con el mismo array para reflejar los cambios en la cantidad
        } else {
          // Agregar el nuevo producto al carrito
          setCartItems((prevCartItems) => [...prevCartItems, product]);
        }
      };
      
    
      //Eliminar prod del Carrito
      const removeFromCart = (productId) => {
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item.id !== productId)
        );
      };
    
      const handleRemove = (productId) => {
        removeFromCart(productId);
        const updatedCartItems = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      };  
    
      //Vaciar carrito completo
      const handleEmptyCart = () => {
        setCartItems([]); // Vaciar el carrito estableciendo el estado en un array vacío
        localStorage.removeItem('cartItems'); // Eliminar el valor del carrito del localStorage
      };
      
    
      //Incrementar prod desde carrito:
      const handleIncrement = (productId) => {
        const updatedCartItems = cartItems.map((item) => {
          if (item.id === productId) {
            return {
              ...item,
              quantity: item.quantity + 1
            };
          }
          return item;
        });
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      };
    
    
      //Disminuir prod desde carrito
    
      const handleDecrement = (productId) => {
        const updatedCartItems = cartItems.map((item) => {
          if (item.id === productId && item.quantity > 0) {
            return {
              ...item,
              quantity: item.quantity - 1
            };
          }
          return item;
        });
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      };
    
    
  return (
    <CartContext.Provider
      value={{cartItems,
    handleDecrement,
handleEmptyCart, 
handleIncrement, 
handleRemove,
addToCart,
cartItemsCount }}
      >{children}</CartContext.Provider>
  )
}