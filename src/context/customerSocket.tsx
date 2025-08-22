import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from "react"
import { io, Socket } from 'socket.io-client';
import { GetLocalStorage } from '../utils/localStorage';

type SocketType = Socket | null;
const SocketContext = createContext<SocketType>(null);

export const useSocket = (): SocketType => useContext(SocketContext);

interface SocketProviderProps {
  children: ReactNode;
  role: 'admin' | 'partner' | 'customer';
}

export const SocketProvider = ({ children, role }: SocketProviderProps) => {
  const [socket, setSocket] = useState<SocketType>(null);

  useEffect(() => {
    // const token = localStorage.getItem('authToken') || '';
    const token = GetLocalStorage('authToken') || '';
    const userId = localStorage.getItem('userId')
    if (!token) {
      console.warn("Missing authToken");
      return;
    }

    const newSocket = io(import.meta.env.VITE_PUBLIC_API_URL, {
      query: { role, token },
      withCredentials: true,
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      console.log(`[${role} Socket] connected: ${newSocket.id}`);
      newSocket.emit('register', { userId, role });
    });

    newSocket.on('connect_error', (err: { message: any; }) => {
      console.error(`[${role} Socket] connection error:`, err.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      console.log(`[${role} Socket] disconnected`);
    };
  }, [role]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
