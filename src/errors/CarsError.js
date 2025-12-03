export class CarsError extends Error {
  constructor(message) {
    super(message);
  }
}

export class CarsCountError extends CarsError {
  constructor(min, max) {
    super(`[ERROR] 자동차 개수는 ${min}~${max}개 사이여야 합니다.`);
  }
}

export class CarsDuplicateError extends CarsError {
  constructor() {
    super(`[ERROR] 자동차 이름은 중복될 수 없습니다.`);
  }
}
