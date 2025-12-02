import Car from '../src/Car';
import Cars from '../src/Cars';

describe('자동차 그룹 테스트', () => {
  test('자동차 목록이 비어있다면 오류가 발생한다.', () => {
    expect(() => new Cars([])).toThrow('[ERROR]');
  });

  test('자동차 그룹에 중복된 자동차 이름이 있다면 오류가 발생한다.', () => {
    const cars = [new Car('pobi'), new Car('pobi')];
    expect(() => new Cars(cars)).toThrow('[ERROR]');
  });

  test('자동차 그룹을 반환한다.', () => {
    const cars = new Cars([new Car('pobi'), new Car('crong')]);

    expect(cars.getCars()[0].getName()).toBe('pobi');
    expect(cars.getCars()[1].getName()).toBe('crong');
  });

  test('그룹 내의 모든 자동차들에게 이동 명령을 내린다.', () => {
    const cars = new Cars([new Car('pobi')]);

    const mockGenerator = {
      generate: () => 4,
    };

    cars.moveAll(mockGenerator);

    expect(cars.getCars()[0].getPosition()).toBe(1);
  });

  test('우승자를 계산한 뒤 반환한다.', () => {
    const pobi = new Car('pobi');
    const crong = new Car('crong');

    const mockGenerator = {
      generate: () => 4,
    };

    pobi.move(mockGenerator);
    const cars = new Cars([pobi, crong]);

    const winners = cars.calculateWinners();

    expect(winners).toHaveLength(1);
    expect(winners[0].getName()).toBe('pobi');
  });
});
