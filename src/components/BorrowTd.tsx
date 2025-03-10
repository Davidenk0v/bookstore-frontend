import { Borrow } from "../models/borrow";

interface BorrowProps {
  borrow: Borrow;
  returnBorrow: (id: string) => void;
}

export const BorrowTd: React.FC<BorrowProps> = ({ borrow, returnBorrow }) => {
  const date = new Date(borrow.borrowDate);
  const formattedDate = date.toLocaleDateString("es-ES");

  const returnDate = new Date(borrow.returnPredictionDate);
  const formattedReturnDate = returnDate.toLocaleDateString("es-ES");

  return (
    <div className="mt-6 flow-root sm:mt-8">
      <div className="divide-y divide-gray-200 ">
        <div className="flex flex-wrap items-center gap-y-4 py-6">
          <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <dt className="text-base font-medium text-gray-500 ">ID:</dt>
            <dd className="mt-1.5 text-base font-semibold text-gray-900 ">
              <a href="#" className="hover:underline">
                #{borrow.id}
              </a>
            </dd>
          </dl>

          <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <dt className="text-base font-medium text-gray-500 ">
              Fecha de alquiler:
            </dt>
            <dd className="mt-1.5 text-base font-semibold text-gray-900 ">
              {formattedDate}
            </dd>
          </dl>

          <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <dt className="text-base font-medium text-gray-500 400">
              Fecha de entrega:
            </dt>
            <dd className="mt-1.5 text-base font-semibold text-gray-900 ">
              {formattedReturnDate}
            </dd>
          </dl>

          <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <dt className="text-base font-medium text-gray-500 400">Estado:</dt>
            <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
              {borrow.status}
            </dd>
          </dl>

          <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
            {borrow.status === "BORROWED" ? (
              <button
                onClick={() => returnBorrow(borrow.id)}
                type="button"
                className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 lg:w-auto"
              >
                Devolver
              </button>
            ) : (
              <button
                disabled
                type="button"
                className="w-full rounded-lg border border-green-700 px-3 py-2 text-center text-sm font-medium text-green-700 focus:outline-none focus:ring-4 focus:ring-red-300 lg:w-auto"
              >
                Devuelto
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
