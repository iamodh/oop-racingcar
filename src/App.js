import GameController from './GameController.js';
import InputView from './InputView.js';
import OutputView from './OutputView.js';

class App {
  async run() {
    const inputView = new InputView();
    const outputView = new OutputView();

    const gameController = new GameController(inputView, outputView);
    await gameController.play();
  }
}

export default App;
