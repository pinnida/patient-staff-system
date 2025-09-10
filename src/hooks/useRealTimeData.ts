import { useEffect, useMemo, useState } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';

export type RealTimeEvent =
  | { type: 'patient-connected'; payload: unknown }
  | { type: 'form-updated'; payload: unknown }
  | { type: 'form-submitted'; payload: unknown }
  | { type: 'patient-disconnect'; payload: unknown };

export function useRealTimeData() {
  const { socket } = useWebSocket();
  const [events, setEvents] = useState<RealTimeEvent[]>([]);

  useEffect(() => {
    if (!socket) return;

    const onConnected = (payload: unknown) => setEvents((e) => [...e, { type: 'patient-connected', payload }]);
    const onUpdated = (payload: unknown) => setEvents((e) => [...e, { type: 'form-updated', payload }]);
    const onSubmitted = (payload: unknown) => setEvents((e) => [...e, { type: 'form-submitted', payload }]);
    const onDisconnect = (payload: unknown) => setEvents((e) => [...e, { type: 'patient-disconnect', payload }]);

    socket.on('patient-connected', onConnected);
    socket.on('form-updated', onUpdated);
    socket.on('form-submitted', onSubmitted);
    socket.on('patient-disconnect', onDisconnect);

    return () => {
      socket.off('patient-connected', onConnected);
      socket.off('form-updated', onUpdated);
      socket.off('form-submitted', onSubmitted);
      socket.off('patient-disconnect', onDisconnect);
    };
  }, [socket]);

  return useMemo(() => ({ events }), [events]);
}


