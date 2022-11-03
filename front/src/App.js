import React from 'react';
import './App.css';
import Home from './components/Home';
import { Footer } from './components/layout/Footer';
import Header from './components/layout/Header';
import { ProductDetails } from './components/products/ProductDetails';
//Router traido desde react-router-dom (no confundir con el de express)
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/admin/Dashboard';
import NewProduct from './components/admin/newProduct';
import ProductsList from './components/admin/ProductsList';
import Cart from './components/cart/Cart';
import SalesList from './components/products/ProductSales';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className='container container-fluid'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/producto/:id" element={<ProductDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/productList" element={<ProductsList />} />
            <Route path="/nuevoProducto" element={<NewProduct />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/admin/sales" element={<SalesList />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;