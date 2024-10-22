import { State } from './state.mjs'

export class GameOver extends State {
  async loadView () {
    await this.screen.applyHtmlTemplate('game-over.html', 'failure')

    const startButton = document.getElementById('continue')
    startButton.addEventListener('click', () => {
      this.game.start();
    })
  }
}
