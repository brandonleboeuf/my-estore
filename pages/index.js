import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import { initiateCheckout } from '../lib/payments';

import products from '../products.json';

const defaultCart = {
  products: {},
};

export default function Home() {
  const [cart, updateCart] = useState(defaultCart);

  const cartItems = Object.keys(cart.products).map((key) => {
    const product = products.find(({ id }) => `${id}` === `${key}`);
    return {
      ...cart.products[key],
      pricePerItem: product.price,
    };
  });

  const subtotal = cartItems.reduce(
    (accumulator, { pricePerItem, quantity }) => {
      return accumulator + pricePerItem * quantity;
    },
    0
  );

  const itemCount = cartItems.reduce((accumulator, { quantity }) => {
    return accumulator + quantity;
  }, 0);

  console.log('itemCount', itemCount);

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

  function checkout() {
    initiateCheckout({
      lineItems: cartItems.map((item) => {
        return {
          price: item.id,
          quantity: item.quantity,
        };
      }),
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Selling Things onLINE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Let's get a selling!</h1>

        <p className={styles.description}>Sell baby sell... online...</p>
        <p className={styles.description}>
          <strong>Items:</strong> {itemCount}
          <br />
          <strong>Total Cost:</strong> {subtotal}
          <br />
          <button
            className={styles.button}
            onClick={() => {
              checkout();
            }}
          >
            Check Out
          </button>
        </p>

        <ul className={styles.grid}>
          {products.map((product) => {
            const { image, title, price, description, id } = product;
            return (
              <li key={id} className={styles.card}>
                <a href="#">
                  <img src={image} alt={description} />
                  <h3>{title}</h3>
                  <p>{price}</p>
                  <p>{description}</p>
                </a>
                <p>
                  <button
                    className={styles.button}
                    onClick={() => {
                      addToCart({
                        id,
                      });
                    }}
                  >
                    Add to Cart <span className={styles.cart}>🛒</span>
                  </button>
                </p>
              </li>
            );
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
