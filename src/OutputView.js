import { Console } from '@woowacourse/mission-utils';

class OutputView {
  printRaceResult(results) {
    Console.print('\n실행 결과');
    results.forEach((roundResult) => {
      const output = roundResult
        .map((car) => `${car.name} : ${'-'.repeat(car.position)}`)
        .join('\n');
      Console.print(output);
      Console.print('');
    });
  }

  printWinners(winners) {
    Console.print(
      `최종 우승자 : ${winners
        .map((winner) => winner.getStatus().name)
        .join(', ')}`
    );
  }

  printErrorMessage(message) {
    Console.print(message + '\n');
  }
}

export default OutputView;
