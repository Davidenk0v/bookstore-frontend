import { createContext, useContext, useRef, useState } from "react";

interface SocketContextType {
  login: () => void;
  close: () => void;
  handleUserChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sendMessage: () => void;
  message: string;
  messageToSend: string;
  user: string;
  connected: boolean;
}

const WebSocketContext = createContext<SocketContextType | null>(null);
const { Provider } = WebSocketContext;

interface Props {
  children: React.ReactNode;
}

export const WebSocketProvider = ({ children }: Props) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messageToSend, setMessageToSend] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);
  interface Message {
    user: string;
    text: string;
    date: Date;
  }

  const login = () => {
    socketRef.current = new WebSocket("ws://localhost:8085/ws");

    socketRef.current.onopen = () => {
      console.log("Conexión establecida");
      setConnected(true);
      socketRef.current?.send(JSON.stringify({ type: "LOGIN", name: user }));
    };

    socketRef.current.onclose = () => {
      console.log("Conexión cerrada");
    };

    socketRef.current.onmessage = (event) => {
      const message: Message = {
        user,
        text: event.data,
        date: new Date(),
      };
      console.log("Mensaje recibido: ", message);
      setMessage(event.data);
    };
  };

  const close = () => {
    if (socketRef.current) {
      socketRef.current.close();
      setConnected(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageToSend(event.target.value);
  };

  const sendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current?.send(messageToSend);
      setMessageToSend("");
    }
  };

  const socket = {
    login,
    close,
    handleUserChange,
    handleChange,
    sendMessage,
    message,
    messageToSend,
    user,
    connected,
    history,
  };

  return <Provider value={socket}>{children}</Provider>;
};

export const useWebSocket = () => useContext(WebSocketContext);
