import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { Client } from "@stomp/stompjs";

const useNotifications = (userId: string) => {
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!userId) return;

    const stompClient = new Client({
      brokerURL: "ws://localhost:8085/ws", // URL del WebSocket
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Conectado al WebSocket");

        stompClient.subscribe(
          `/user/${userId}/queue/notifications`,
          (message) => {
            console.log("Mensaje recibido:", message.body);
            const notification = JSON.parse(message.body);
            toast.info(notification.content);
          }
        );
      },
      onStompError: (frame) => console.error("Error en STOMP:", frame),
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate().catch(console.error);
      }
    };
  }, [userId]);

  return null; // No necesita devolver JSX
};

export default useNotifications;
