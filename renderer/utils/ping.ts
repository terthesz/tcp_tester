import net from 'net';
import dns from 'dns';

/**
 * Ping a host.
 *
 * @param address
 * @param lib
 * @returns
 */
const ping = async (address: string, lib?: 'net' | 'socket.io'): Promise<boolean> => {
  // add socket.io if needed
  if (lib === 'socket.io') return false;

  return await ping_using_net(address);
};

/**
 * Ping a host using net.
 *
 * @param address
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

export default ping;
