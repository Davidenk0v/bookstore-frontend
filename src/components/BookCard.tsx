import bookImg from "../assets/book.svg";
interface Props {
  book: any;
}

export const BookCard: React.FC<Props> = ({ book }) => {
  return (
    <div className="w-full max-w-sm bg-slate-200 shadow-xl border-gray-200 rounded-lg ">
      <a href="#">
        <img className="p-8 rounded-t-lg " src={bookImg} alt="product image" />
      </a>
      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
          {book.title}
        </h5>
        <p className="text-sm font-normal text-gray-500 mt-1.5">
          {book.authorId}
        </p>
        <div className="flex items-center mt-2.5 mb-5">
          <span className="text-xs font-semibold text-gray-900 ">
            Stock disponible
          </span>
          <span className="bg-green-300 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm  ms-3">
            {book.available_quantity}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 ">$599</span>
          <a
            href="#"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Alquilar
          </a>
        </div>
      </div>
    </div>
  );
};
