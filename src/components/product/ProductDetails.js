import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";

const initialStates = {
  loading: true,
  product: {},
  error: "",
};

const productReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUCT_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        product: action.payload,
        error: "",
      };
    case "FETCH_PRODUCT_ERROR":
      return {
        ...state,
        loading: false,
        product: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

const ProductDetails = () => {
  const { productId } = useParams();
  const [productStates, dispatch] = useReducer(productReducer, initialStates);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, status } = await axios.get(
          `https://dummyjson.com/products/${productId}`
        );
        status === 200 &&
          dispatch({ type: "FETCH_PRODUCT_SUCCESS", payload: data });
      } catch (error) {
        console.log(error);
        dispatch({ type: "FETCH_PRODUCT_ERROR", payload: error.message });
      }
    };
    fetchProduct();
  }, []);
  const { loading, product, error } = productStates;

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <div className="details__container">
          <img
            src={product.thumbnail}
            alt="product-img"
            className="details__img"
          />
          <div className="details__content">
            <h2 className="details__title">{product.title}</h2>
            <h1 className="details__price">${product.price}</h1>
            <p className="details__description">{product.description}</p>
            <button className="back__button">
              <Link to="/">Back</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
