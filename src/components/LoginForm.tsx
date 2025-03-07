import { FormEvent, useState } from "react";
import { Title } from "./Title";
import { login } from "../authServices";
export const LoginForm = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    login(formValues);
  };
  return (
    <section className="container mx-auto px-4 p-6 text-center">
      <Title
        title="Bookstore"
        description="Inicia sesión para empezar a disfrutar de tus libros"
      />
      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Username
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Introduce tu nombre de usuario"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Contraseña
          </label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
          />
        </div>
        <button
          onClick={handleSubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Iniciar sesión
        </button>
      </form>
    </section>
  );
};
