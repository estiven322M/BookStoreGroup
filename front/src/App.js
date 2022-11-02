import React from 'react';
import './App.css';
import Home from './componnents/Home';
import { Footer } from './componnents/layout/Footer';
import Header from './componnents/layout/Header';
import { ProductDetails } from './componnents/products/ProductDetails';
//Router traido desde react-router-dom (no confundir con el de express)
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './componnents/admin/Dashboard';
import NewProduct from './componnents/admin/newProduct';
import ProductsList from './componnents/admin/ProductsList';
import Cart from './componnents/cart/Cart';
import SalesList from './componnents/products/ProductSales';

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