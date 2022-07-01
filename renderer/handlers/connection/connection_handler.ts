import { Dispatch, SetStateAction } from 'react';
import { RunButtonHandler, StoreHandler } from '..';

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

  /**
   * Connects to the server.
   */
  connect() {
    const engine = StoreHandler.get('engine_choice');

    const unsubscribe = StoreHandler.onDidChange('engine_choice', () => {
      unsubscribe();

      this.disconnect();

      this.connect();
    });

    // connect
  }

  /**
   * Disconnects from the server.
   */
  disconnect() {
    // disconnect

    RunButtonHandler.set_state(false);
  }
}

export default new ConnectionHandler();
