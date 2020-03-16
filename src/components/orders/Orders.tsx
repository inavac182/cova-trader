import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { OrdersStore } from 'src/stores/orders.store';
import { HomePageStore } from 'src/stores';
import { OrdersList } from '.';

interface OrdersProps {
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
    const { loading, orders, error, displayName } = ordersStore;

    useEffect(() => {
      ordersStore.fetchOrders(bookSelected);
    }, [bookSelected]);

    return (
      <section className="orders-list">
        <div className="">
          <h2>{displayName}</h2>
        </div>

        {loading && <p>Loading orders...</p>}
        {orders && (
          <div>
            <OrdersList orders={orders.asks} direction="desc" />
            <div className="oders-separator"></div>
            <OrdersList orders={orders.bids} />
          </div>
        )}
        {error && <p>Error loading orders...</p>}
      </section>
    );
  })
);
