class Cars {
  #cars;
  static Error = {
    CARS_COUNT: '[ERROR] 자동차는 최소 1대 이상이여야 합니다.',
    NAME_DUPLICATE: '[ERROR] 자동차 이름은 중복될 수 없습니다.',
  };
  constructor(cars) {
    this.#validateCars(cars);
    this.#cars = cars;
  }

  #validateCars(cars) {
    if (cars.length === 0) {
      throw new Error(Cars.Error.CARS_COUNT);
    }

    const names = cars.map((car) => car.getName());
    if (new Set(names).size !== names.length) {
      throw new Error(Cars.Error.NAME_DUPLICATE);
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
