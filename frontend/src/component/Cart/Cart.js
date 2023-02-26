import React, { Fragment } from 'react'
import "./Cart.css";
import CartItemCard from "./CartItemCard.js"



const Cart = () => {

    const item = {
        product:"ProductID",
        price:2000,
        name:"KEshav",
        quantity:1,
        image:"https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
    }

  return <Fragment>
    <div className='cartPage'>
        <div className='carHeader'>
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>
        </div>

        <div className='cartContainer'>
            <CartItemCard item={item} />
            <div className='cartInput'>
                <button>-</button>
                <input type="number" value={item.quantity}  readOnly/>
                <button>+</button>
            </div>

            <div className='cartSubtotal'>
                {`₹${
                    item.price * item.quantity
                }`}
            </div>

        </div>
        
        <div className='cartGrossProfit'>
            <div></div>
            <div className='cartGrossProfitBox'>
                <p>Gross Profit</p>
                <p>{`₹600`}</p>
            </div>
            <div></div>
            <div className='checkOutBtn'>
                <button>Check Out</button>
            </div>
        </div>

    </div>
  </Fragment>
}

export default Cart