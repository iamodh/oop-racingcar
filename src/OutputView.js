import { Console } from '@woowacourse/mission-utils';

class OutputView {
  printResultHeader() {
    Console.print('\n실행 결과');
  }
  printRoundResult(cars) {
    cars.forEach((car) =>
      Console.print(`${car.getName()} : ${'-'.repeat(car.getPosition())}`)
    );
    Console.print('');
  }

  printWinners(winners) {
    Console.print(
      `최종 우승자 : ${winners.map((winner) => winner.getName()).join(', ')}`
    );
  }

  printErrorMessage(message) {
    Console.print(message + '\n');
  }
}

export default OutputView;
