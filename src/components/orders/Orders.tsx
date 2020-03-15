import React from 'react';
import { inject, observer } from 'mobx-react';
import { OrdersStore } from 'src/stores/orders.store';

export interface OrdersProps {
  ordersStore?: OrdersStore;
}

export const Orders = inject('ordersStore')(
  observer((props: OrdersProps) => {
    const {
      ordersStore: { loading, book, orders, error },
    } = props;

    return (
      <div className="orders">
        <p>Book selected: {book}</p>
        {loading && <p>Loading orders...</p>}
        {orders && (
          <p>
            <span>{`Asks: ${orders.asks.length}`}</span>
            <span>{`Bids: ${orders.bids.length}`}</span>
          </p>
        )}
        {error && <p>Error loading orders...</p>}
      </div>
    );
  })
);
