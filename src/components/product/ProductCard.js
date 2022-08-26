import React, { useContext } from "react";
import "boxicons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CartContext } from "../../App";

const ProductCard = ({ productId, image, price, title }) => {
  const { cartState, cartDispatch } = useContext(CartContext);

  const addToCart = () => {
    cartDispatch({
      type: "ADD_TO_CART",
      payload: { productId, image, price, title },
    });
  };

  const removeFromCart = () => {
    cartDispatch({
      type: "REMOVE_FROM_CART",
      payload: productId,
    });
  };
  return (
    <motion.div whileHover={{ scale: 1.1 }} className="card__content">
      <img src={image} alt="card-img" className="card__image" />
      <div className="card__title-wrapper">
        <Link to={`/product/${productId}`} className="__title">
          {title}
        </Link>
        <h3 className="card__price">{price}</h3>
      </div>
      {cartState.cart.some((cart) => cart.productId === productId) ? (
        <button
          className="card__button card__button--remove"
          onClick={removeFromCart}
        >
          <box-icon name="cart" animation="tada-hover" color="white"></box-icon>
        </button>
      ) : (
        <button className="card__button cart__button--add" onClick={addToCart}>
          <box-icon name="cart" animation="tada-hover" color="white"></box-icon>
        </button>
      )}
    </motion.div>
  );
};

export default ProductCard;
