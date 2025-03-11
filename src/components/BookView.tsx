import bookImg from "../assets/book.svg";
import { useParams } from "react-router";
import { getBookByIsbn } from "../services/bookService";
import { useEffect, useState } from "react";
import { Book } from "../models/book";
import { newBorrow } from "../services/borrowService";
import { BorrowRequest } from "../models/borrow";
import { getUserId } from "../utils/jwtHelper";
import NotificationComponent from "./websocket/NotificationComponent";
export const BookView = () => {
  const isbn = useParams<{ isbn: string }>().isbn;
  const [book, setBook] = useState<Book>();
  const [userId, setUserId] = useState<string>("");
  const getBook = async () => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    if (token && isbn) {
      getBookByIsbn(token, isbn).then((response) => {
        setUserId(getUserId());
        setBook(response.data.data[0]);
      });
    }
  };

  const createBorrow = async () => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    if (token && isbn) {
      const borrow: BorrowRequest = {
        bookId: isbn,
        userId: getUserId(),
        days: 7,
      };
      newBorrow(token, borrow).then((response) => {
        console.log(response);
      });
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  return (
    <section className="bg-white py-8 antialiased  md:py-16">
      <div className="mx-auto grid max-w-screen-xl px-4 pb-8 md:grid-cols-12 lg:gap-12 lg:pb-16 xl:gap-0">
        <div className="content-center justify-self-start md:col-span-7 md:text-start">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight  md:max-w-2xl md:text-5xl xl:text-6xl">
            {book?.title}
          </h1>
          <p className="mb-4 max-w-2xl text-gray-500 dark:text-gray-400 md:mb-12 md:text-lg lg:mb-5 lg:text-xl">
            {book?.authorName}
          </p>
          <p className="mb-4 max-w-2xl text-gray-500 dark:text-gray-400 md:mb-12 md:text-lg lg:mb-5 lg:text-xl">
            {book?.categoryName}
          </p>
          <p className="mb-4 max-w-2xl text-black dark:text-gray-400 md:mb-12 md:text-lg lg:mb-5 lg:text-xl">
            Stock disponible{" "}
            <span className="bg-green-300 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm  ms-3">
              {book?.total_quantity}
            </span>
          </p>
          <button
            onClick={createBorrow}
            className="inline-block rounded-lg bg-blue-700 px-6 py-3.5 text-center font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 "
          >
            Alquilar
          </button>
        </div>
        <div className="hidden md:col-span-5 md:mt-0 md:flex">
          <img
            className="dark:hidden"
            src={bookImg}
            alt="shopping illustration"
          />
          <img
            className="hidden dark:block"
            src={bookImg}
            alt="shopping illustration"
          />
        </div>
      </div>
    </section>
  );
};
