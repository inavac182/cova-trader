import { Ask, Bid } from '.';

export interface OrdersPayload {
  asks: [Ask];
  bids: [Bid];
}

export interface Orders {
  success: boolean;
  payload: OrdersPayload;
  updated_at: string;
  sequence: string;
}
