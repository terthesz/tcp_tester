/**
 * This class handles the run button.
 */
class RunButtonHandler {
  /**
   * This function is called when the user clicks the run button.
   * It checks if the IP address is valid and if so, it starts the game.
   *
   * @param e
   */
  on_click(e: MouseEvent) {
    const { target } = e as any;
  }

  /**
   * This function enables/disables the run button.
   */
  set_state(enabled: boolean = true) {
    const run_button = document.getElementById('run-button');
    if (!run_button) throw new Error('No run button!');

    if (enabled) {
      run_button.classList.remove('disabled');

      return;
    }

    run_button.classList.add('disabled');
  }
}

export default new RunButtonHandler();
