import './App.css';
import React from 'react';
import Header from './componnents/layout/Header';
import { Footer } from './componnents/layout/Footer';
import Home from './componnents/Home';
import { ProductDetails } from './componnents/products/ProductDetails';
//Router traido desde react-router-dom (no confundir con el de express)
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
    <div className="App">
        <Header />
        <div className='container container-fluid'>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Home" element={<Home />}/>
            <Route path="/producto/:id" element={<ProductDetails />}/>
          </Routes>
        </div>
        <Footer />
    </div>
    </Router>
  );
}

export default App;