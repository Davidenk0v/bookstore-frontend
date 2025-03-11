import React, { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { toast } from "react-toastify";

interface Props {
  userId: string;
}

const NotificationComponent: React.FC<Props> = ({ userId }) => {
  const client = useRef<Client | null>(null);

  useEffect(() => {
    client.current = new Client({
      brokerURL: "ws://localhost:8085/ws",
      connectHeaders: {
        login: "user",
        passcode: "password",
      },
      onConnect: () => {
        console.log("Conectado al WebSocket");
        client.current?.subscribe(
          `/topic/notifications/${userId}`,
          (message) => {
            const data = message.body;
            console.log("📩 Notificación recibida:", data);
            toast(data);
          }
        );
        client.current?.publish({
          destination: "/app/connect",
          body: JSON.stringify({ userId }),
        });
      },
      onDisconnect: () => {
        console.log("Desconectado del WebSocket");
      },
      onStompError: (frame) => {
        console.error("Error STOMP:", frame.body);
        toast.error("Error de conexión");
      },
      reconnectDelay: 5000,
    });

    client.current.activate();

    return () => {
      client.current?.deactivate();
    };
  }, [userId]);

  return <></>;
};

export default NotificationComponent;
