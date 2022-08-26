import React, { useContext } from "react";
import { CartContext } from "../App";
const Cart = () => {
  const { cartState } = useContext(CartContext);
  console.log(cartState);
  const { cart } = cartState;

  return (
    <div>
      <h2>List of Cart</h2>
      {cart.length < 1 && <h2>no item on cart</h2>}
      <div className="cart__container">
        {cart.map((cartItem, index) => (
          <div className="cart__content" key={index}>
            <img src={cartItem.image} alt="cart-img" className="cart__img" />
            <div className="cart__data">
              <h4 className="cart__title">{cartItem.title}</h4>
              <h5 className="cart__price">${cartItem.price}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
