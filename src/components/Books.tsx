import { useEffect, useState } from "react";
import { BookCard } from "./BookCard";
import { Title } from "./Title";
import { getAllBooks } from "../services/bookService";
export const Books = () => {
  const [books, setBooks] = useState([]);

  const getAll = async () => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    const response = await getAllBooks(token);
    const data = await response.json();
    console.log(data.body.data);
    setBooks(data.body.data);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <Title
        title="Bookstore"
        description="Encuentra tu próximo libro favorito"
      />
      <section className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book: any) => (
          <BookCard key={book.id} book={book} />
        ))}
      </section>
    </>
  );
};
