import React from 'react';
import {useEffect,useState} from "react"
import "./App.css";
import Header from"./component/layout/Header/Header.js"
import { BrowserRouter as Router,Route, Routes,Navigate,Switch } from 'react-router-dom';
import WebFont from "webfontloader";
import Footer from"./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js"
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store"
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js"
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js"
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from "./component/Cart/ConfirmOrder.js"
import Payment from "./component/Cart/Payment.js"
import axios from 'axios';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from "./component/Cart/orderSuccess.js"
import MyOrders from "./component/Order/MyOrders.js"
import OrderDetails from "./component/Order/OrderDetails.js"





function App() {

  const {isAuthenticated,user} = useSelector(state=>state.user)

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey(){
    const {data} = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey) 
  }

  useEffect(()=>{

    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    });
    store.dispatch(loadUser())
    getStripeApiKey();
  },[])


  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user}/>}
      <Routes>

      <Route exact path='/' element={<Home />} />
      <Route exact path='/product/:id' element={<ProductDetails />} />
      <Route exact path='/products' element={<Products />} />
      <Route path='/products/:keyword' element={<Products />} />
      <Route exact path='/search' element={<Search />} />
      <Route exact path='/account' element={<ProtectedRoute component={Profile}/>} />
      
      <Route exact path='/me/update' element={isAuthenticated ? <UpdateProfile /> : <Navigate to="/login"/>} />
      <Route exact path='/password/update' element={isAuthenticated ? <UpdatePassword /> : <Navigate to="/login"/>} />
      <Route exact path='/password/forgot' element={<ForgotPassword />} />
      <Route exact path='/password/reset/:token' element={<ResetPassword />} />
      <Route exact path='/login' element={<LoginSignUp />} />
      <Route exact path='/cart' element={<Cart />} />
      <Route exact path='/shipping' element={<ProtectedRoute component={Shipping}/>} />



     {stripeApiKey && (
     <Route exact path='/process/payment' element={isAuthenticated ? <Elements stripe={loadStripe(stripeApiKey)}> <Payment />  </Elements> : <Navigate to="/login"/>} />

     )}

      <Route exact path='/success' element={isAuthenticated ? <OrderSuccess /> : <Navigate to="/login"/>} />
      <Route exact path='/orders' element={<ProtectedRoute component={MyOrders}/> } />

      <Route exact path='/order/confirm' element={<ProtectedRoute component={ConfirmOrder}/>}/>

      <Route exact path='/order/:id' element={<ProtectedRoute component={OrderDetails}/> } />
      

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
