import { Console } from '@woowacourse/mission-utils';
import {
  InputCarNamesFormatError,
  InputTryCountFormatError,
} from './errors/InputError.js';

class InputView {
  static MESSAGE = {
    ASK_CAR_NAMES:
      '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n',
    ASK_TRY_COUNT: '시도할 횟수는 몇 회인가요?\n',
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
        throw new InputCarNamesFormatError(carNames);
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
      throw new InputTryCountFormatError(count);
    }
  }
}

export default InputView;
