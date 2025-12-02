import InputView from '../src/InputView';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

describe('입력 뷰 테스트', () => {
  test('입력받은 자동차 이름이 공백이면 오류가 발생한다.', async () => {
    const inputView = new InputView();
    const inputs = ['pobi, '];
    mockQuestions(inputs);

    await expect(inputView.getCarNames()).rejects.toThrow('[ERROR]');
  });
  test('입력받은 자동차 이름이 5글자를 초과하면 오류가 발생한다.', async () => {
    const inputView = new InputView();
    const inputs = ['pobi, fancycar'];
    mockQuestions(inputs);

    await expect(inputView.getCarNames()).rejects.toThrow('[ERROR]');
  });
  test(' 입력받은 시도 횟수 0보다 큰 정수가 아니라면 ㄴ오류가 발생한다.', async () => {
    const inputView = new InputView();
    const inputs = ['1.5'];
    mockQuestions(inputs);

    await expect(inputView.getTrialCount()).rejects.toThrow('[ERROR]');
  });
});
