export class InputError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InputError';
  }
}

export class InputCarNamesFormatError extends InputError {
  constructor(carNames) {
    super(`[ERROR] 자동차 목록 ${carNames}에 빈 문자열이 포함되어 있습니다.`);
    this.name = 'InputCarNamesFormatError';
  }
}

export class InputTryCountFormatError extends InputError {
  constructor(count) {
    super(`[ERROR] 시도 횟수 ${count}은 0보다 큰 양의 정수여야 합니다.`);
    this.name = 'InputTryCountFormatError';
  }
}
