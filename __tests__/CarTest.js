import Car from '../src/Car';

describe('자동차', () => {
  test('자동차 이름이 빈 값이면 오류가 발생한다.', () => {
    const carName = ' ';
    expect(() => new Car(carName)).toThrow('[ERROR]');
  });
  test('자동차 이름이 5글자 초과면 오류가 발생한다.', () => {
    const carName = 'fancycar';
    expect(() => new Car(carName)).toThrow('[ERROR]');
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

    const number = Car.MIN_NUMBER_TO_MOVE - 1;
    const mockGenerator = { generate: () => number };

    car.move(mockGenerator);
    expect(car.getPosition()).toBe(0);
  });
  test('숫자가 4 이상인 경우 한 칸 전진한다.', () => {
    const carName = 'pobi';
    const car = new Car(carName);

    const number = Car.MIN_NUMBER_TO_MOVE;
    const mockGenerator = { generate: () => number };

    car.move(mockGenerator);
    expect(car.getPosition()).toBe(Car.MOVEMENT_DISTANCE);
  });
});
