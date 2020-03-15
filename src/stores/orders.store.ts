import { observable, action, computed } from 'mobx';
import { StoreDefaults } from '../utils/storeDefaults';
import { Store } from '../utils/store';
import { OrdersPayload, Orders } from 'src/types';

export class OrdersStore extends Store {
  @observable public orders: OrdersPayload;
  @observable public book: string;
  @observable public updatedAt: string;
  @observable public sequence: string;
  @observable public loading: boolean;
  @observable public error: boolean;

  @action
  public fetchOrders(book: string) {
    this.hydrate({
      book: book,
      loading: true,
      orders: OrdersStore.DEFAULTS.orders,
    });

    fetch(`https://api.bitso.com/v3/order_book/?book=${book}`)
      .then(res => res.json())
      .then((orders: Orders) => {
        if (orders.success) {
          this.hydrate({
            orders: orders.payload,
            loading: false,
            updatedAt: orders.updated_at,
            sequence: orders.sequence,
          });
        }
      })
      .catch(res => {
        console.log('Err: ', res);
      });
  }

  public hydrate(data: StoreDefaults) {
    Object.assign(this, data);
  }
}

OrdersStore.DEFAULTS = {
  orders: {
    asks: [],
    bids: [],
  },
  updatedAt: '',
  sequence: '',
  loading: false,
  error: false,
};
