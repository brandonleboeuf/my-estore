import Head from 'next/head';
import styles from '../styles/Home.module.css';

import { initiateCheckout } from '../lib/payments';

import products from '../products.json';

export default function Home() {
  console.log('products', products);
  return (
    <div className={styles.container}>
      <Head>
        <title>Selling Things onLINE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Let's get a selling!</h1>

        <p className={styles.description}>Sell baby sell... online...</p>

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
                      initiateCheckout({
                        lineItems: [
                          {
                            price: id,
                            quantity: 1,
                          },
                        ],
                      });
                    }}
                  >
                    Buy Now
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
