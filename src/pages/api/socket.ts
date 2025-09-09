import type { NextApiRequest, NextApiResponse } from 'next';
import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

type NextApiResponseWithSocket = NextApiResponse & {
  socket: NextApiResponse['socket'] & {
    server: NetServer & { io?: SocketIOServer };
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (!res.socket.server.io) {
    const io = new SocketIOServer(res.socket.server, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    res.socket.server.io = io;

    io.on('connection', (socket) => {
      socket.emit('connected', { id: socket.id });

      socket.on('patient-connect', (payload) => {
        socket.data.patient = payload;
        io.emit('patient-connected', { id: socket.id, ...payload });
      });

      socket.on('form-update', (payload) => {
        socket.broadcast.emit('form-updated', { id: socket.id, ...payload });
      });

      socket.on('form-submit', (payload) => {
        io.emit('form-submitted', { id: socket.id, ...payload });
      });

      socket.on('disconnect', (reason) => {
        io.emit('patient-disconnect', { id: socket.id, reason });
      });
    });
  }

  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};


