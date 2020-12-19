import Head from 'next/head';
import { FaShoppingCart } from 'react-icons/fa';
import { BsFillTrashFill } from 'react-icons/bs';
import styles from '../styles/Cart.module.css';
import stylesbtn from '../styles/Home.module.css';

import { useCart } from '../hooks/use-cart';

import Table from '../pages/components/Table';

import products from '../products.json';

const columns = [
  {
    columnId: 'title',
    Header: 'Product Name',
  },
  {
    columnId: 'quantity',
    Header: 'Quantity',
  },
  {
    columnId: 'pricePerItem',
    Header: 'Price Per',
  },
  {
    columnId: 'total',
    Header: 'Item Total',
  },
];

export default function Cart() {
  const { cartItems, checkout, updateItem } = useCart();

  const data = cartItems.map((item) => {
    const product = products.find(({ id }) => id === item.id);

    const Quantity = () => {
      function handleOnSubmit(e) {
        e.preventDefault();

        const { currentTarget } = e;
        const inputs = Array.from(currentTarget.elements);
        const quantity = inputs.find((input) => input.name === 'quantity')
          ?.value;

        updateItem({
          id: item.id,
          quantity: quantity && parseInt(quantity),
        });
      }

      function handleDelete(e) {
        e.preventDefault();

        updateItem({
          id: item.id,
          quantity: 0,
        });
        // console.log('delete', e);
      }

      return (
        <form onSubmit={handleOnSubmit}>
          <input
            type="number"
            name="quantity"
            min={0}
            defaultValue={item.quantity}
            style={{
              width: '50px',
              marginRight: '5px',
            }}
          />
          <button>Update</button>
          <button
            style={{
              marginLeft: '5px',
            }}
            onClick={handleDelete}
            className={stylesbtn.trash}
          >
            <BsFillTrashFill />
          </button>
        </form>
      );
    };

    return {
      ...item,
      quantity: <Quantity />,
      total: item.quantity * item.pricePerItem,
      title: product.title,
    };
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Shopping Cart - Brandon's Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <FaShoppingCart /> Cart
        </h1>

        <Table className={styles.table} data={data} columns={columns} />

        <p className={styles.checkout}>
          <button className={stylesbtn.button} onClick={checkout}>
            CheckOut
          </button>
        </p>
      </main>
    </div>
  );
}
