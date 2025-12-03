import { CarsCountError, CarsDuplicateError } from './errors/CarsError.js';

class Cars {
  #cars;
  static COUNT = {
    MIN: 1,
    MAX: 5,
  };

  constructor(cars) {
    this.#validateCars(cars);
    this.#cars = cars;
  }

  #validateCars(cars) {
    if (cars.length < Cars.COUNT.MIN || cars.length > Cars.COUNT.MAX) {
      throw new CarsCountError(Cars.COUNT.MIN, Cars.COUNT.MAX);
    }

    const names = cars.map((car) => car.getName());
    if (new Set(names).size !== names.length) {
      throw new CarsDuplicateError();
    }
  }

  getCars() {
    return [...this.#cars];
  }

  moveAll(numberGenerator) {
    this.#cars.forEach((car) => car.move(numberGenerator));
  }

  calculateWinners() {
    const maxPosition = Math.max(...this.#cars.map((car) => car.getPosition()));

    return this.#cars.filter((car) => car.getPosition() === maxPosition);
  }
}

export default Cars;
