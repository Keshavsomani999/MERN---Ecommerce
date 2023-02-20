import React from 'react';
import "./App.css";
import Header from"./component/layout/Header/Header.js"
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import WebFont from "webfontloader";
import Footer from"./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js"
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignUp from './component/User/LoginSignUp';


function App() {
  React.useEffect(()=>{

    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
  
  },[])
  return (
    <Router>
      <Header />
      <Routes>

      <Route extact path='/' element={<Home />} />
      <Route extact path='/product/:id' element={<ProductDetails />} />
      <Route extact path='/products' element={<Products />} />
      <Route path='/products/:keyword' element={<Products />} />
      <Route extact path='/search' element={<Search />} />
      <Route extact path='/login' element={<LoginSignUp />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
