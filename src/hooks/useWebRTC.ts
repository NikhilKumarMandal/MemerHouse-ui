import { useCallback, useEffect, useRef } from "react";
import { useStateWithCallback } from "./useStateWithCallback";

interface Client {
    _id: string;
    username: string;
}


export interface User {
    _id: string;
    username: string;

}

export const useWebRTC = (roomId: string, user: User) => {
  const [clients, setClients] = useStateWithCallback<Client[]>([]);

  const audioElements = useRef<Record<string, HTMLAudioElement | null>>({});
  const localMediaStream = useRef<MediaStream | null>(null);

  const provideRef = (instance: HTMLAudioElement | null, userId: string) => {
    audioElements.current[userId] = instance;
  };

  const addNewClients = useCallback(
    (newClient: Client, cb?: () => void) => {
      setClients((prevClients) => {
        const exists = prevClients.some((client) => client._id === newClient._id);
        if (!exists) {
          return [...prevClients, newClient];
        }
        return prevClients;
      }, cb);
    },
    [setClients]
  );

  useEffect(() => {
    const startCapture = async () => {
      try {
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        // Add the local user as a client
        addNewClients({ _id: user._id, username: user.username }, () => {
          const localElement = audioElements.current[user._id];

          if (localElement && localMediaStream.current) {
            localElement.volume = 0; // Mute local audio
            localElement.srcObject = localMediaStream.current;
          }
        });
      } catch (error) {
        console.error("Error capturing media:", error);
      }
    };

    startCapture();
  }, [addNewClients, user]);

  return { clients, provideRef };
};