import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { Client } from "@stomp/stompjs";

const useNotifications = (userId: string) => {
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!userId || userId == "") return;
    console.log(userId);
    const stompClient = new Client({
      brokerURL: `ws://localhost:8085/ws`,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ Conectado al WebSocket");
        stompClient.debug = (message) => {
          console.log(message);
        };
        stompClient.subscribe(
          `/user/${userId}/queue/notifications`,
          (message) => {
            console.log("📩 Notificación recibida:", message);

            try {
              const notification = JSON.parse(message.body);
              if (notification?.content) {
                toast.info(notification.content, { autoClose: 3000 });
                console.log("Notificación mostrada:", notification.content);
              } else {
                console.warn(
                  "Notificación sin contenido válido:",
                  message.body
                );
              }
            } catch (error) {
              console.error("Error al procesar la notificación:", error);
            }
          }
        );
      },
      onStompError: (frame) => console.error("Error en STOMP:", frame),
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClientRef.current?.deactivate().catch(console.error);
      console.log("WebSocket desconectado");
    };
  }, [userId]);
};

export default useNotifications;
