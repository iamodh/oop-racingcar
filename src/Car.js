class Car {
  #name;
  #position;
  static MAX_NAME_LENGTH = 5;
  static MIN_NUMBER_TO_MOVE = 4;
  static MOVEMENT_DISTANCE = 1;

  constructor(name) {
    this.#validateName(name);
    this.#name = name;
    this.#position = 0;
  }

  #validateName(name) {
    if (name.trim() === '' || name.length > Car.MAX_NAME_LENGTH) {
      throw new Error('[ERROR] 유효하지 않은 자동차 이름입니다.');
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
