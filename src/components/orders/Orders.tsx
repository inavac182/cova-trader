import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { OrdersStore } from 'src/stores/orders.store';
import { HomePageStore } from 'src/stores';

export interface OrdersProps {
  ordersStore?: OrdersStore;
  homePageStore?: HomePageStore;
}

export const Orders = inject(
  'ordersStore',
  'homePageStore'
)(
  observer((props: OrdersProps) => {
    const { ordersStore, homePageStore } = props;
    const { bookSelected } = homePageStore;
    const { loading, orders, error, book } = ordersStore;

    useEffect(() => {
      ordersStore.fetchOrders(bookSelected);
    }, [bookSelected]);

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
