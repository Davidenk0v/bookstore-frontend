import { useEffect, useState } from "react";
import { BorrowList } from "../models/borrow";
import { getUserBorrows, returnBorrow } from "../services/borrowService";
import { jwtDecode } from "jwt-decode";
import { BorrowTd } from "./BorrowTd";

export const BorrowLists = () => {
  const [borrows, setBorrows] = useState<BorrowList>([]);
  const fetchBorrows = async () => {
    const token = JSON.parse(localStorage.getItem("token") || "{}");
    const id = jwtDecode(token).sub || "";
    getUserBorrows(token, id).then((response) => {
      const borrows = response.data.body.data;
      setBorrows(borrows);
    });
  };

  const returnBook = (idBorrow: string) => {
    const token = JSON.parse(localStorage.getItem("token") || "{}");
    returnBorrow(token, idBorrow).then(() => {
      fetchBorrows();
    });
  };

  useEffect(() => {
    fetchBorrows();
  }, []);

  return (
    <section className="bg-white py-8 antialiased  md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
              Mis alquileres
            </h2>

            <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
              <div>
                <label
                  htmlFor="order-type"
                  className="sr-only mb-2 block text-sm font-medium text-gray-900 "
                >
                  Select order type
                </label>
                <select
                  id="order-type"
                  className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                >
                  <option selected>Todos los alquileres</option>
                  <option value="pre-order">En proceso</option>
                  <option value="transit">Acabados</option>
                  <option value="confirmed">Atrasados</option>
                </select>
              </div>

              <span className="inline-block text-gray-500 "> de </span>

              <div>
                <label
                  htmlFor="duration"
                  className="sr-only mb-2 block text-sm font-medium text-gray-900 "
                >
                  Select duration
                </label>
                <select
                  id="duration"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                >
                  <option selected>Esta semana</option>
                  <option value="this month">Este mes</option>
                  <option value="last 3 months">Este año</option>
                </select>
              </div>
            </div>
          </div>
          {borrows.map((borrow) => (
            <BorrowTd
              key={borrow.id}
              borrow={borrow}
              returnBorrow={returnBook}
            />
          ))}

          <nav
            className="mt-6 flex items-center justify-center sm:mt-8"
            aria-label="Page navigation example"
          ></nav>
        </div>
      </div>
    </section>
  );
};
