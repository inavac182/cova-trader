import React, { useState } from 'react';
import { Ask, Bid } from 'src/types';
import { isUsingStaticRendering } from 'mobx-react';

interface OrdersListProps {
  orders: [Ask | Bid];
  direction?: string;
}

export const OrdersList = (props: OrdersListProps) => {
  const { orders, direction } = props;
  const [showAll, setShowAll] = useState(false);
  let ordersSorted = [];

  ordersSorted = orders;

  if (!showAll && ordersSorted.length > 20) {
    ordersSorted.splice(20, ordersSorted.length);
  }

  if (direction === 'desc') {
    ordersSorted = orders.slice().reverse();
  }

  return (
    <>
      <ul className="orders-list">
        {ordersSorted.map((order: Ask | Bid, key: number) => {
          const price = parseFloat(order.price);
          const formattedPrice = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price);

          return (
            <li key={key}>
              {formattedPrice} - {order.amount} -{' '}
            </li>
          );
        })}
      </ul>
    </>
  );
};
