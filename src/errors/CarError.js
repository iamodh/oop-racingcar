export class CarError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CarError';
  }
}

export class CarNameLengthError extends CarError {
  constructor(name, min, max) {
    super(
      `[ERROR] 자동차 이름 "${name}"의 길이는 ${min}~${max}자 사이여야 합니다.`
    );
    this.name = 'CarNameLengthError';
  }
}
