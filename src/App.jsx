import { useState, useEffect} from 'react'
import './App.css'

//ROUTE
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'

//PAGES 
import CategoryPage from './pages/CategoryPage/CategoryPage'
import AboutUsPage from './pages/AboutUsPage/AboutUsPage'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import DetailProduct from './pages/DetailProduct/DetailProduct'
import ShopcartPage from './pages/ShopcartPage/ShopcartPage'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'

///Componentes
import Header from './components/Header/Header'
import NavBar from './components/NavBar/NavBar'

//CONTEXT:
import { CartProvider } from './context/CartContext'

//Página de inicio
import ItemListContainer from './pages/ItemList/ItemListContainer'


const App = () => {
   return (
    <>
    <Router>
      <CartProvider>
      <Header/>
      <div className='divNav'>
        <NavBar/>
        <Routes>
          <Route path='/' element={<ItemListContainer/>} />
          <Route path='/category/:categoryId' element={<CategoryPage/>} />
          <Route path='/aboutUs' element={<AboutUsPage/>} />
          <Route path="*" element={<ErrorPage />} />
          <Route path='/item/:id'element={<DetailProduct/>}/> 
          <Route path='/carrito' element={<ShopcartPage/>}/>
          <Route path='/checkout' element={<CheckoutPage/>}/>
        </Routes>
      </div>
      </CartProvider>
      </Router>
    </>
  )
}

export default App
