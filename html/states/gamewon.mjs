import { State } from './state.mjs'

export class GameWon extends State {
  async loadView () {
    await this.screen.applyHtmlTemplate('success.html', 'success')

    const startButton = document.getElementById('continue')
    startButton.addEventListener('click', () => {
      this.game.start();
    })
  }
}
