import styles from '../../styles/Home.module.css';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../hooks/use-cart.js';

import formatter from '../../helperFunctions/formatter';

const logo = '/stripe.png';

const Nav = () => {
  const { subtotal, checkout } = useCart();

  return (
    <nav>
      <Link href="/">
        <a style={{ display: 'flex' }}>
          <h1 style={{ textDecoration: 'underline' }}>Brandon's Shop</h1>
          <img
            src="/images/stripe.png"
            alt=""
            style={{ marginLeft: '10px', width: '75px' }}
          />
        </a>
      </Link>
      <Link href="/cart">
        <a className={styles.buttonCheckout}>
          <FaShoppingCart />
          <span className={styles.cart__nav}>
            {formatter.format(subtotal)}{' '}
          </span>
        </a>
      </Link>
    </nav>
  );
};

export default Nav;
