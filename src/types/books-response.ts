export interface Book {
  book: string;
  minimum_price: string;
  maximum_price: string;
  minimum_amount: string;
  maximum_amount: string;
  minimum_value: string;
  maximum_value: string;
}

export interface BooksResponse {
  success: boolean;
  payload: [Book];
}
