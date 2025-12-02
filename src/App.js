import GameController from './GameController.js';
import InputView from './InputView.js';
import NumberGenerator from './NumberGenerator.js';
import OutputView from './OutputView.js';

class App {
  async run() {
    const inputView = new InputView();
    const outputView = new OutputView();
    const numberGenerator = new NumberGenerator();

    const gameController = new GameController(
      inputView,
      outputView,
      numberGenerator
    );
    await gameController.play();
  }
}

export default App;
