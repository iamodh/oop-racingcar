import { Random } from '@woowacourse/mission-utils';
import { CarNameLengthError } from './errors/CarError.js';

class Car {
  #name;
  #position;
  static NAME_LENGTH = { MIN: 1, MAX: 5 };
  static MOVEMENT = {
    THRESHOLD: 4,
    DISTANCE: 1,
  };
  static defaultMoveStrategy = () =>
    Random.pickNumberInRange(0, 9) >= Car.MOVEMENT.THRESHOLD;

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

  getStatus() {
    return {
      name: this.#name,
      position: this.#position,
    };
  }

  move(strategy = Car.defaultMoveStrategy) {
    const isMovable = strategy();
    if (isMovable) {
      this.#position += Car.MOVEMENT.DISTANCE;
    }
  }
}

export default Car;
