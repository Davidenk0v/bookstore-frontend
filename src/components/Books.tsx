import { useEffect, useState, useCallback } from "react";
import { BookCard } from "./BookCard";
import { Title } from "./Title";
import { getAllBooks } from "../services/bookService";
import { Book, BookList } from "../models/book";
import { ToastContainer } from "react-toastify";
import useNotifications from "./websocket/useNotification";
import { jwtDecode } from "jwt-decode";

export const Books = () => {
  const [books, setBooks] = useState<BookList>([]);
  const [userId, setUserId] = useState<string>("");
  const fetchBooks = useCallback(async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token") || '""');
      const id = jwtDecode(token).sub || "";
      setUserId(id);
      const response = await getAllBooks(token);
      setBooks(response.data.body.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  useNotifications(userId);

  return (
    <>
      <Title
        title="Bookstore"
        description="Encuentra tu próximo libro favorito"
      />
      <ToastContainer />
      <section className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book: Book) => (
          <BookCard key={book.isbn} book={book} />
        ))}
      </section>
    </>
  );
};
