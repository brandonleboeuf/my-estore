import { loadStripe } from '@stripe/stripe-js';
import { useState, createContext, useContext, useEffect } from 'react';

import { initiateCheckout } from '../lib/payments';

import products from '../products.json';

const defaultCart = {
  products: {},
};

export const CartContext = createContext();

export function useCartState() {
  const [cart, updateCart] = useState(defaultCart);

  useEffect(() => {
    const stateFromStorage = window.localStorage.getItem('brandon_cart');
    const data = stateFromStorage && JSON.parse(stateFromStorage);
    if (data) {
      updateCart(data);
    }
  }, []);

  useEffect(() => {
    const data = JSON.stringify(cart);
    window.localStorage.setItem('brandon_cart', data);
  }, [cart]);

  // creates an array of cart items

  const cartItems = Object.keys(cart.products).map((key) => {
    const product = products.find(({ id }) => `${id}` === `${key}`);
    return {
      ...cart.products[key],
      pricePerItem: +product.price,
    };
  });

  const subtotal = cartItems.reduce(
    (accumulator, { pricePerItem, quantity }) => {
      return accumulator + pricePerItem * quantity;
    },
    0
  );

  const totalItems = cartItems.reduce((accumulator, { quantity }) => {
    return accumulator + quantity;
  }, 0);

  function addToCart({ id } = {}) {
    updateCart((prev) => {
      let cartState = { ...prev };

      if (cartState.products[id]) {
        cartState.products[id].quantity++;
      } else {
        cartState.products[id] = {
          id,
          quantity: 1,
        };
      }

      return cartState;
    });
  }

  function updateItem({ id, quantity }) {
    updateCart((prev) => {
      let cartState = { ...prev };

      if (cartState.products[id]) {
        cartState.products[id].quantity = quantity;
      }

      if (cartState.products[id].quantity <= 0) {
        delete cartState.products[id];
      }

      // if (cartState.products[id].quantity <= 0) {
      //   // let resulte = cart.filter((id) => cart.id !== cartState.products[id]);

      //   const inputs = Array.from(cartState.products);
      //   const quantity = inputs.find((id) => inputs.id !== cart.id);
      //   console.log(cart);
      // }

      return cartState;
    });
  }

  function checkout() {
    // initiates checkout sequence for Stripe
    initiateCheckout({
      lineItems: cartItems.map((item) => {
        return {
          price: item.id,
          quantity: item.quantity,
        };
      }),
    });
  }

  return {
    cart,
    updateCart,
    updateItem,
    cartItems,
    subtotal,
    totalItems,
    addToCart,
    checkout,
  };
}

export function useCart() {
  const cart = useContext(CartContext);
  return cart;
}
