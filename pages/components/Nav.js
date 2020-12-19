import styles from '../../styles/Home.module.css';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../hooks/use-cart.js';

const logo = '/stripe.png';

const Nav = () => {
  const { subtotal, checkout } = useCart();

  return (
    <nav>
      <Link href="/">
        <a>
          <h1 style={{ textDecoration: 'underline' }}>Brandon's Shop</h1>
          <img
            src="/images/stripe.png"
            alt=""
            style={{ margin: '-20px 0 0 125px', width: '75px' }}
          />
        </a>
      </Link>
      <Link className={styles.buttonCheckout} href="/cart">
        <a>
          <FaShoppingCart />
          <span className={styles.cart__nav}>${subtotal}.00 </span>
        </a>
      </Link>
    </nav>
  );
};

export default Nav;
