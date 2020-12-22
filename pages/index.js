import Head from 'next/head';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import styles from '../styles/Home.module.css';

import { useCart } from '../hooks/use-cart';

import products from '../products.json';

import formatter from '../helperFunctions/formatter';

export default function Home() {
  const { addToCart } = useCart();

  return (
    <div className={styles.container}>
      <Head>
        <title>Selling Things onLINE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p className={styles.description}>
          The only place to buy shirts, stickers and pets...
        </p>

        <ul className={styles.grid}>
          {products.map((product) => {
            const { image, title, price, description, id } = product;
            const priceForm = formatter.format(price);
            return (
              <li key={id} className={styles.card}>
                <Link href={`/products/${id}`}>
                  <a>
                    <img
                      src={image}
                      alt={description}
                      style={{ maxWidth: '100%' }}
                    />
                    <h3>{title}</h3>
                    <p>{priceForm}</p>
                    <p>{description}</p>
                  </a>
                </Link>
                <p>
                  <button
                    className={styles.button}
                    onClick={() => {
                      addToCart({
                        id,
                      });
                    }}
                  >
                    Add to Cart <FaShoppingCart />
                  </button>
                </p>
              </li>
            );
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://brandon-leboeuf.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          built by Ⓑrandon
        </a>
      </footer>
    </div>
  );
}
