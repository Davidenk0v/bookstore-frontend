import { jwtDecode } from "jwt-decode";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const token = JSON.parse(localStorage.getItem("token") || '""');
  if (token) {
    const decode = jwtDecode(token);
    console.log(decode);
  }
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header fijo arriba */}
      <header>
        <Header />
      </header>
      {/* Contenido principal que se expande */}
      <main className="flex-grow container mx-auto px-4 p-6">{children}</main>

      {/* Footer siempre al fondo */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};
