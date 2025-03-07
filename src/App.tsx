import { Route, Routes } from "react-router";
import { LoginForm } from "./components/LoginForm";
import "./index.css";
import { Layout } from "./layouts/Layout";
import { RegisterForm } from "./components/RegisterForm";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Layout>
  );
}

export default App;
