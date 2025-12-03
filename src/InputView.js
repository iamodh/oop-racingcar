import { Console } from '@woowacourse/mission-utils';

class InputView {
  static MESSAGE = {
    ASK_CAR_NAMES:
      '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n',
    ASK_TRY_COUNT: '시도할 횟수는 몇 회인가요?\n',
  };
  static ERROR = {
    CAR_NAME_FORMAT: '[ERROR] 자동차 이름에 빈 문자열이 포함되어 있습니다.',
    TRY_COUNT_FORMAT: '[ERROR] 시도 횟수는 0보다 큰 양의 정수여야 합니다.',
  };
  async getCarNames() {
    const input = await Console.readLineAsync(InputView.MESSAGE.ASK_CAR_NAMES);

    const carNames = input.split(',').map((name) => name.trim());
    this.#validateCarNames(carNames);
    return carNames;
  }

  #validateCarNames(carNames) {
    carNames.forEach((name) => {
      if (name === '') {
        throw new Error(InputView.ERROR.CAR_NAME_FORMAT);
      }
    });
  }

  async getTrialCount() {
    const input = await Console.readLineAsync(InputView.MESSAGE.ASK_TRY_COUNT);
    const count = Number(input.trim());
    this.#validateTrialCount(count);

    return count;
  }

  #validateTrialCount(count) {
    if (Number.isNaN(count) || !Number.isInteger(count) || count <= 0) {
      throw new Error(InputView.ERROR.TRY_COUNT_FORMAT);
    }
  }
}

export default InputView;
