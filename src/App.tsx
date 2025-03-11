import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import { LoginForm } from "./components/LoginForm";
import "./index.css";
import { Layout } from "./layouts/Layout";
import { RegisterForm } from "./components/RegisterForm";
import { Books } from "./components/Books";
import { BookView } from "./components/BookView";
import { Profile } from "./components/Profile";
import { useAuth } from "./contexts/AuthProvider";
import { ToastContainer } from "react-toastify";
function App() {
  const ProtectedRoute = () => {
    const auth = useAuth();
    if (auth === null || auth === undefined) {
      return <Navigate to="/" />;
    }

    return auth.isLoggedIn ? <Outlet /> : <Navigate to="/" />;
  };
  return (
    <BrowserRouter>
      <Layout>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/books" element={<Books />} />
            <Route path="/books/:isbn" element={<BookView />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
