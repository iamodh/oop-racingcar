import Car from './Car.js';
import Cars from './Cars.js';

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
  }
}

export default GameController;
