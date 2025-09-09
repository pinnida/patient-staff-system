import { useEffect, useMemo, useRef, useState } from 'react';
import type { Socket } from 'socket.io-client';
import { getSocket } from '@/utils/socketClient';

export function useWebSocket() {
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    let isUnmounted = false;

    async function init() {
      try {
        await fetch('/api/socket');
      } catch (_) {}
      if (isUnmounted) return;
      const socket = getSocket();
      socketRef.current = socket;

      const onConnect = () => setConnected(true);
      const onDisconnect = () => setConnected(false);

      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);

      return () => {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
      };
    }

    const cleanupPromise = init();

    return () => {
      isUnmounted = true;
      // cleanup after init resolves
      Promise.resolve(cleanupPromise).then((cleanup: any) => {
        if (typeof cleanup === 'function') cleanup();
      });
    };
  }, []);

  return useMemo(
    () => ({ socket: socketRef.current, connected }),
    [connected]
  );
}


