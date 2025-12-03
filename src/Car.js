import { CarNameLengthError } from './errors/CarError.js';

class Car {
  #name;
  #position;
  static NAME_LENGTH = { MIN: 1, MAX: 5 };
  static MIN_NUMBER_TO_MOVE = 4;
  static MOVEMENT_DISTANCE = 1;

  constructor(name) {
    this.#validateName(name);
    this.#name = name;
    this.#position = 0;
  }

  #validateName(name) {
    if (
      name.length < Car.NAME_LENGTH.MIN ||
      name.length > Car.NAME_LENGTH.MAX
    ) {
      throw new CarNameLengthError(
        name,
        Car.NAME_LENGTH.MIN,
        Car.NAME_LENGTH.MAX
      );
    }
  }

  getName() {
    return this.#name;
  }
  getPosition() {
    return this.#position;
  }

  move(numberGenerator) {
    const number = numberGenerator.generate();
    if (number >= Car.MIN_NUMBER_TO_MOVE) {
      this.#position += Car.MOVEMENT_DISTANCE;
    }
  }
}

export default Car;
