import net from 'net';
import { StoreHandler } from '../handlers';
import io from 'socket.io-client';

/**
 * Ping a host.
 *
 * @param address
 * @param lib
 * @returns
 */
const ping = async (address: string): Promise<boolean> => {
  const engine = StoreHandler.get('engine_choice');

  // add socket.io if needed
  if (engine === 'socket.io') return false;

  if (engine === 'net') return await ping_using_net(address);
  if (engine === 'socket-io') return await ping_using_socket_io(address);

  return false;
};

/**
 * Ping a host using net.
 *
 * @param address
 *
 * @returns
 */
const ping_using_net = async (address: string): Promise<boolean> => {
  const socket = new net.Socket();
  socket.setTimeout(2500);

  const [host, port] = address.split(':');

  if (!port) return false;

  const result: boolean = await new Promise((resolve) => {
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });

    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });

    socket.on('error', (err) => {
      socket.destroy();
      resolve(false);
    });

    socket.connect(Number(port), host);
  });

  return result;
};

/**
 * Ping a host using socket.io.
 *
 * @param address
 *
 * @returns
 */
const ping_using_socket_io = async (address: string): Promise<boolean> => {
  const [host, port] = address.split(':');

  if (!port) return false;

  const pre_fetch = await fetch(`http://${address}/socket.io/?EIO=4&transport=polling`)
    .then((result) => {
      if (result.status === 200) return true;
      return false;
    })
    .catch((error) => false);

  if (!pre_fetch) return false;

  const result: boolean = await new Promise((resolve) => {
    const socket = io(address, {
      reconnection: false,
      timeout: 2500,
    });

    socket.on('connect', () => {
      socket.disconnect();
      resolve(true);
    });

    socket.on('error', () => {
      socket.disconnect();
      resolve(false);
    });

    socket.on('connect_timeout', () => {
      socket.disconnect();
      resolve(false);
    });
  });

  return result;
};

export default ping;
