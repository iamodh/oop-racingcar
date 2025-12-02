import { Random } from '@woowacourse/mission-utils';

class NumberGenerator {
  static MIN_NUMBER = 0;
  static MAX_NUMBER = 9;
  generate() {
    return Random.pickNumberInRange(
      NumberGenerator.MIN_NUMBER,
      NumberGenerator.MAX_NUMBER
    );
  }
}

export default NumberGenerator;
