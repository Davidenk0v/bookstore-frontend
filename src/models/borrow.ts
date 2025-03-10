export interface Borrow {
  id: string;
  bookId: string;
  userId: string;
  borrowDate: Date;
  returnPredictionDate: Date;
  returnDate: Date;
  status: string;
  penalty: number;
}

export type BorrowList = Borrow[];

export interface BorrowRequest {
  bookId: string;
  userId: string;
  days: number;
}
