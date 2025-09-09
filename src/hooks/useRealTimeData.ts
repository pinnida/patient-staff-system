import { useEffect, useMemo, useState } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';

export type RealTimeEvent =
  | { type: 'patient-connected'; payload: any }
  | { type: 'form-updated'; payload: any }
  | { type: 'form-submitted'; payload: any }
  | { type: 'patient-disconnect'; payload: any };

export function useRealTimeData() {
  const { socket } = useWebSocket();
  const [events, setEvents] = useState<RealTimeEvent[]>([]);

  useEffect(() => {
    if (!socket) return;

    const onConnected = (payload: any) => setEvents((e) => [...e, { type: 'patient-connected', payload }]);
    const onUpdated = (payload: any) => setEvents((e) => [...e, { type: 'form-updated', payload }]);
    const onSubmitted = (payload: any) => setEvents((e) => [...e, { type: 'form-submitted', payload }]);
    const onDisconnect = (payload: any) => setEvents((e) => [...e, { type: 'patient-disconnect', payload }]);

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


