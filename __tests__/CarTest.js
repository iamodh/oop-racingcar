import Car from '../src/Car';

describe('자동차', () => {
  test('자동차 이름이 1글자 미만, 5글자 초과면 오류가 발생한다.', () => {
    const emptyName = '';
    const longName = 'fancycar';
    expect(() => new Car(emptyName)).toThrow('[ERROR]');
    expect(() => new Car(longName)).toThrow('[ERROR]');
  });

  test('자동차의 이름과 현재 위치를 반환한다.', () => {
    const carName = 'pobi';
    const car = new Car(carName);

    expect(car.getName()).toBe(carName);
    expect(car.getPosition()).toBe(0);
  });

  test('숫자가 4 미만인 경우 움직이지 않는다.', () => {
    const carName = 'pobi';
    const car = new Car(carName);

    const number = 3;
    const mockGenerator = { generate: () => number };

    car.move(mockGenerator);
    expect(car.getPosition()).toBe(0);
  });
  test('숫자가 4 이상인 경우 한 칸 전진한다.', () => {
    const carName = 'pobi';
    const car = new Car(carName);

    const number = 4;
    const mockGenerator = { generate: () => number };

    car.move(mockGenerator);
    expect(car.getPosition()).toBe(1);
  });
});
