import { StoreHandler } from '..';

/**
 * This class manages the engine choice component.
 */
class EngineChoiceHandler {
  engine_choice_element: HTMLElement;
  engine_choice_elements: HTMLElement[] = [];
  engine_choices: Array<string> = ['net', 'socket-io'];
  active_engine_choice: string;

  constructor() {}

  /**
   * Initializes the engine choice handler.
   */
  setup() {
    const engine_choice_element = document.getElementById('engine-choice');

    if (!engine_choice_element) throw new Error('No engine choice element!');

    this.engine_choice_element = engine_choice_element;
    this.engine_choice_elements = Array.from(engine_choice_element.getElementsByTagName('p'));

    this.update_active_choice(StoreHandler.get('engine_choice') + '');

    this.setup_event_listeners();
  }

  /**
   * This function updates the engine choice.
   *
   * @param engine_choice
   */
  update_active_choice(engine_choice: string) {
    if (!engine_choice || engine_choice === 'undefined') engine_choice = 'net';

    if (this.active_engine_choice) {
      const index = this.engine_choices.indexOf(this.active_engine_choice);

      this.engine_choice_elements[index].classList.remove('active');
    }

    const index = this.engine_choices.indexOf(engine_choice);

    this.engine_choice_elements[index].classList.add('active');

    this.active_engine_choice = engine_choice;
  }

  /**
   * This function adds a new event listener to all engine choice elements.
   */
  setup_event_listeners() {
    this.engine_choice_elements.forEach((element) => {
      element.addEventListener('click', this.on_engine_choice_click.bind(this));
    });
  }

  /**
   * This is the event listener for the engine choice elements.
   *
   * @param e
   */
  on_engine_choice_click(e: MouseEvent) {
    const { target } = e as any;

    if (!target) return;

    const engine_choice = target.id;

    this.update_active_choice(engine_choice);

    StoreHandler.set('engine_choice', engine_choice);
  }
}

export default new EngineChoiceHandler();
