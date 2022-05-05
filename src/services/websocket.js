import { PROXY_URL } from 'config';
import io from 'socket.io-client';

export const setupSocket = (accessToken) => {
  return io(`${PROXY_URL}/board-ws`, {
    transports: ['websocket'],
    query: {
      bearer: `Bearer ${accessToken}`,
    },
  });
};
