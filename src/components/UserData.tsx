import { User } from "../models/user";

interface UserDataProps {
  user: User;
}
export const UserData: React.FC<UserDataProps> = ({ user }) => {
  return (
    <>
      <div className="top-0 left-0 z-40 w-full max-w-xs p-4 mb-10  bg-white">
        <h5
          id="drawer-label"
          className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase "
        >
          Mis datos
        </h5>
        <button
          type="button"
          data-drawer-dismiss="drawer-update-product-default"
          aria-controls="drawer-update-product-default"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center "
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <form action="#">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Name
              </label>
              <input
                type="text"
                name="title"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                value={user?.name}
                required
              />
            </div>
            <div>
              <label
                htmlFor="brand"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Correo electrónico
              </label>
              <input
                type="text"
                name="title"
                id="brand"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                value={user?.email}
                required
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Libros en posesión (0)
              </label>
            </div>
            <div></div>
          </div>
          <div className=" flex justify-center pb-4 mt-4 mb-4 space-x-4 sm:absolute sm:px-4 sm:mt-0">
            <button
              type="submit"
              className="w-full justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Update
            </button>
            <button
              type="button"
              className="w-full justify-center text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 mr-1 -ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Delete
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
