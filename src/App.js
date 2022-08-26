import axios from "axios";
import React, { useEffect, useReducer } from "react";
import Cart from "./components/Cart";
import Product from "./components/product/Product";

const initialProductStates = {
  loading: true,
  products: [],
  error: "",
};

const initialCartStates = {
  cart: [],
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
        products: action.payload,
        error: "",
      };
    case "FETCH_PRODUCT_ERROR":
      return {
        ...state,
        loading: false,
        products: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, { ...action.payload }],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((cart) => cart.productId !== action.payload),
      };
    default:
      return state;
  }
};

export const CartContext = React.createContext(null);

function App() {
  const [productState, productDispatch] = useReducer(
    productReducer,
    initialProductStates
  );
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartStates);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, status } = await axios.get(
          "https://dummyjson.com/products"
        );
        status === 200 &&
          productDispatch({
            type: "FETCH_PRODUCT_SUCCESS",
            payload: data.products,
          });
      } catch (error) {
        productDispatch({
          type: "FETCH_PRODUCT_ERROR",
          payload: error.message,
        });
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <CartContext.Provider value={{ cartState, cartDispatch }}>
        <div className="app">
          <Product productState={productState} />
          <Cart />
        </div>
      </CartContext.Provider>
    </div>
  );
}

export default App;
