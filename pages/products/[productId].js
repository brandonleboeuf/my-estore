import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import productStyles from '../../styles/Product.module.css';

import { useCart } from '../../hooks/use-cart';

import products from '../../products.json';

export default function Product({ product }) {
  const { id, title, description, image, price } = product;

  const { addToCart } = useCart();

  return (
    <div className={styles.container}>
      <Head>
        <title>{title} - Brandon's Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={productStyles.main}>
        <div className={productStyles.productImageContainer}>
          <img src={image} alt={title} className={productStyles.productImage} />
        </div>
        <div className={productStyles.description}>
          <h1>{title}</h1>
          <p>{description}</p>
          <p>${price}.00</p>
          <p>
            <button
              className={styles.button}
              onClick={() => {
                addToCart({ id });
              }}
            >
              Add to Cart
            </button>
          </p>
        </div>
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

export async function getStaticProps({ params }) {
  const product = products.find(({ id }) => id === params.productId);
  console.log(params);
  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const paths = products.map((product) => {
    return {
      params: {
        productId: product.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
