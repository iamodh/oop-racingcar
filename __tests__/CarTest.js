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

    expect(car.getStatus().name).toBe(carName);
    expect(car.getStatus().position).toBe(0);
  });

  test('자동차의 위치를 이동한다.', () => {
    const carName = 'pobi';
    const car = new Car(carName);

    car.move();
    expect(car.getStatus().position).toBe(1);
  });
});
