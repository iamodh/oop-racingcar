import NumberGenerator from '../src/NumberGenerator';

describe('숫자 생성기', () => {
  test('0과 10 사이의 숫자를 생성한다.', () => {
    const numberGenerator = new NumberGenerator();

    for (let i = 0; i < 100; i++) {
      const number = numberGenerator.generate();
      expect(number).toBeGreaterThanOrEqual(0);
      expect(number).toBeLessThanOrEqual(10);
    }
  });
});
