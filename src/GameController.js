import Car from './Car.js';
import Cars from './Cars.js';
import { CarError } from './errors/CarError.js';
import { CarsError } from './errors/CarsError.js';
import { InputError } from './errors/InputError.js';

class GameController {
  #inputView;
  #outputView;
  #numberGenerator;

  constructor(inputView, outputView, numberGenerator) {
    this.#inputView = inputView;
    this.#outputView = outputView;
    this.#numberGenerator = numberGenerator;
  }

  async play() {
    while (true) {
      try {
        const carNames = await this.#inputView.getCarNames();
        const trialCount = await this.#inputView.getTrialCount();

        const cars = new Cars(carNames.map((name) => new Car(name)));

        this.#outputView.printResultHeader();
        for (let i = 0; i < trialCount; i++) {
          cars.moveAll(this.#numberGenerator);
          this.#outputView.printRoundResult(cars.getCars());
        }

        const winners = cars.calculateWinners();
        this.#outputView.printWinners(winners);
        return;
      } catch (error) {
        if (
          error instanceof InputError ||
          error instanceof CarsError ||
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
