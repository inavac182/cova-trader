export interface Ticker {
  book: string;
  volume: string;
  high: string;
  last: string;
  low: string;
  vwap: string;
  ask: string;
  bid: string;
  created_at: string;
}

export interface TickerResponse {
  success: boolean;
  payload: [Ticker];
}
