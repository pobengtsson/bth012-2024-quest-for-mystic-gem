import { State } from './state.mjs'
import { Player } from '../player.mjs'

export class Setup extends State {
  async loadView () {
    await this.screen.applyHtmlTemplate('welcome.html', 'welcome')

    const startButton = this.game.window.document.getElementById('start')
    startButton.addEventListener('click', () => {
      const nameInput = this.game.window.document.getElementById('name').value  || "Pixel Pendleton"
      this.game.player = new Player(nameInput)
      this.game.startGame();
    })
  }
}
