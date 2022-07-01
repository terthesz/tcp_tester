import { ConnectionHandler, RunButtonHandler } from '..';
import { ping } from '../../utils';

/**
 * This function is called when the user changes the IP address.
 * It handles the input, validates it and stores it.
 *
 * @param e
 * @returns
 */
async function on_submit_event(e) {
  const { target } = e;
  let address = target.value;

  // Get parent element and change input field status
  const parent = target.parentElement;

  // Handle input field state
  await handle_input_field_state(parent, target, address);
}

/**
 * This function handles the input field state.
 * It checks if the given address is valid and changes the input field state accordingly.
 * (colour and tooltip)
 *
 * @param parent
 * @param input_field
 * @param address
 * @returns
 */
async function handle_input_field_state(parent: HTMLDivElement, input_field: HTMLInputElement, address: string) {
  if (input_field.value === '') {
    parent.classList.remove('success');
    parent.classList.remove('error');

    RunButtonHandler.set_state(false);

    return;
  }

  if (await ping(address)) {
    ConnectionHandler.address = address;

    parent.getElementsByTagName('p')[0].innerHTML = 'Valid IP address.';

    parent.classList.remove('error');
    parent.classList.add('success');

    RunButtonHandler.set_state();

    return;
  }

  parent.getElementsByTagName('p')[0].innerHTML = 'Invalid IP address.';

  RunButtonHandler.set_state(false);

  parent.classList.add('error');
  parent.classList.remove('success');
}

export default { on_submit_event };
