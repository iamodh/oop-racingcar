import {
  RaceCarsCountError,
  RaceCarsDuplicateError,
} from './errors/RaceError.js';

class Race {
  #cars;
  #trialCount;
  static CARS_COUNT = {
    MIN: 1,
    MAX: 5,
  };

  constructor(cars, trialCount) {
    this.#validateCars(cars);
    this.#cars = cars;
    this.#trialCount = trialCount;
  }

  #validateCars(cars) {
    if (
      cars.length < Race.CARS_COUNT.MIN ||
      cars.length > Race.CARS_COUNT.MAX
    ) {
      throw new RaceCarsCountError(Race.CARS_COUNT.MIN, Race.CARS_COUNT.MAX);
    }

    const names = cars.map((car) => car.getStatus().name);
    if (new Set(names).size !== names.length) {
      throw new RaceCarsDuplicateError();
    }
  }

  start(numberGenerator) {
    const results = [];
    for (let i = 0; i < this.#trialCount; i++) {
      this.#moveAllCars(numberGenerator);

      const roundResult = this.#cars.map((car) => car.getStatus());
      results.push(roundResult);
    }

    return results;
  }

  #moveAllCars(numberGenerator) {
    this.#cars.forEach((car) => car.move(numberGenerator));
  }

  calculateWinners() {
    const maxPosition = Math.max(
      ...this.#cars.map((car) => car.getStatus().position)
    );

    return this.#cars.filter((car) => car.getStatus().position === maxPosition);
  }
}

export default Race;
