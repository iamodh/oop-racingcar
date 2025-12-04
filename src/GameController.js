import Car from './Car.js';
import { CarError } from './errors/CarError.js';
import { InputError } from './errors/InputError.js';
import { RaceError } from './errors/RaceError.js';
import Race from './Race.js';

class GameController {
  #inputView;
  #outputView;
  #numberGenerator;

  constructor(inputView, outputView) {
    this.#inputView = inputView;
    this.#outputView = outputView;
  }

  async play() {
    while (true) {
      try {
        const carNames = await this.#inputView.getCarNames();
        const trialCount = await this.#inputView.getTrialCount();

        const cars = carNames.map((name) => new Car(name));
        const race = new Race(cars, trialCount);

        const results = race.start();
        this.#outputView.printRaceResult(results);
        const winners = race.calculateWinners();
        this.#outputView.printWinners(winners);
        return;
      } catch (error) {
        if (
          error instanceof InputError ||
          error instanceof RaceError ||
          error instanceof CarError
        ) {
          this.#outputView.printErrorMessage(error.message);
        } else {
          throw error;
        }
      }
    }
  }
}

export default GameController;
