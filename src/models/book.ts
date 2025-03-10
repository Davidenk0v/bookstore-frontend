export interface Book {
  isbn: string;
  title: string;
  authorName: string;
  categoryName: string;
  status: string;
  avalible_quantity: number;
  total_quantity: number;
}

export type BookList = Book[];
