import Car from '../src/Car';
import Race from '../src/Race';

describe('경주 테스트', () => {
  test('참여 자동차 목록이 비어있다면 오류가 발생한다.', () => {
    expect(() => new Race([], 1)).toThrow('[ERROR]');
  });

  test('참여 자동차 목록 내 중복된 자동차 이름이 있다면 오류가 발생한다.', () => {
    const cars = [new Car('pobi'), new Car('pobi')];
    expect(() => new Race(cars, 1)).toThrow('[ERROR]');
  });

  test('경주를 시작한 뒤 실행 결과를 반환한다.', () => {
    const cars = [new Car('pobi')];
    const race = new Race(cars, 2);

    const alwaysMoveStrategy = () => true;

    const results = race.start(alwaysMoveStrategy);
    const firstRoundResult = results[0];
    const secondRoundResult = results[1];
    expect(firstRoundResult[0].position).toBe(1);
    expect(secondRoundResult[0].position).toBe(2);
  });

  test('우승자를 계산한 뒤 반환한다.', () => {
    const pobi = new Car('pobi');
    const crong = new Car('crong');

    const alwaysMoveStrategy = () => true;
    pobi.move(alwaysMoveStrategy);
    const race = new Race([pobi, crong], 1);

    const winners = race.calculateWinners();

    expect(winners).toHaveLength(1);
    expect(winners[0].getStatus().name).toBe('pobi');
  });
});
