import { BrowserRouter, Route, Routes } from "react-router";
import { LoginForm } from "./components/LoginForm";
import "./index.css";
import { Layout } from "./layouts/Layout";
import { RegisterForm } from "./components/RegisterForm";
import { WebSocketProvider } from "./contexts/WebSocketContext";
import { Books } from "./components/Books";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <WebSocketProvider>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/books" element={<Books />} />
          </Routes>
        </WebSocketProvider>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
