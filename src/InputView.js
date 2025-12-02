import { Console } from '@woowacourse/mission-utils';
import Car from './Car.js';

class InputView {
  async getCarNames() {
    const input = await Console.readLineAsync(
      '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n'
    );

    const carNames = input.split(',').map((name) => name.trim());
    this.#validateCarNames(carNames);
    return carNames;
  }

  #validateCarNames(carNames) {
    carNames.forEach((name) => {
      if (name === '' || name.length > Car.MAX_NAME_LENGTH) {
        throw new Error('[ERROR] 유효하지 않은 자동차 이름입니다.');
      }
    });
  }

  async getTrialCount() {
    const input = await Console.readLineAsync('시도할 횟수는 몇 회인가요?\n');
    const count = Number(input);
    this.#validateTrialCount(count);

    return count;
  }

  #validateTrialCount(count) {
    if (Number.isNaN(count) || !Number.isInteger(count) || count <= 0) {
      throw new Error('[ERROR] 시도 횟수는 0보다 큰 양의 정수여야 합니다.');
    }
  }
}

export default InputView;
