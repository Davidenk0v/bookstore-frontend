import { useEffect, useState } from "react";
import { BookCard } from "./BookCard";
import { Title } from "./Title";
import { getAllBooks } from "../services/bookService";
import { Book, BookList } from "../models/book";
import { ToastContainer, toast } from "react-toastify";
import { useWebSocket } from "../contexts/WebSocketContext";
export const Books = () => {
  const webSocket = useWebSocket();
  const [books, setBooks] = useState<BookList>([]);

  const notify = (message: string) => toast(message);
  const [notification, setNotification] = useState(webSocket?.message || "");
  const getAll = async () => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    const response = await getAllBooks(token);
    const fetchBooks = response.data.body.data;
    setBooks(fetchBooks);
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    setNotification(webSocket?.message || "");
    if (notification && notification !== "") {
      notify(notification);
    }
  }, [webSocket?.message]);

  return (
    <>
      <Title
        title="Bookstore"
        description="Encuentra tu próximo libro favorito"
      />
      {notification && <ToastContainer />}

      <section className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book: Book) => (
          <BookCard key={book.isbn} book={book} />
        ))}
      </section>
    </>
  );
};
