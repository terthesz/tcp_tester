import { Dispatch, SetStateAction } from 'react';

/**
 * Handles the connection to the server.
 */
class ConnectionHandler {
  _address: String;
  _port: Number | null;

  _address_state: Dispatch<SetStateAction<string>> | undefined;

  /**
   * Initializes the connection to the server.
   *
   * @param address_state
   */
  init(address_state?: Dispatch<SetStateAction<string>>) {
    this._address_state = address_state;
  }

  set address(raw_address: String) {
    const [address, port] = raw_address.split(':');

    this._address = address;
    this._port = Number(port) || null;

    if (this._address_state) this._address_state(this.address);
  }

  get address(): string {
    return `${this._address}${this._port ? `:${this._port}` : ''}`;
  }
}

export default new ConnectionHandler();
