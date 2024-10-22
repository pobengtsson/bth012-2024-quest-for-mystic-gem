import { Setup } from './states/setup.mjs'
import { GameOn } from './states/gameon.mjs'
import { GameWon } from './states/gamewon.mjs'
import { GameOver } from './states/gameover.mjs'

export class Game {
  constructor (theWindow, screen, prng = Math.random) {
    this.window = theWindow
    this.screen = screen
    this.prng = prng
    this.pauseEventHandler = (event) => {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  async start () {
    await this.setState(new Setup(this, this.screen))
  }

  async startGame () {
    await this.setState(new GameOn(this, this.screen))
  }

  async gameWon () {
    await this.setState(new GameWon(this, this.screen))
  }

  async gameOver () {
    await this.setState(new GameOver(this, this.screen))
  }

  gameIsOver () {
    return !this.player.isHealthy()
  }

  async setState(newState) {
    this.clearEventListener()
    this.state = newState
    this.setEventListener()
    this.state.loadView()
  }

  clearEventListener () {
    if (this.handleEvent) {
      this.window.removeEventListener('keydown', this.handleEvent)
      delete this.handleEvent
    }
  }

  setEventListener () {
    this.handleEvent = this.state.handleEvent.bind(this.state)
    this.window.addEventListener('keydown', this.handleEvent)
  }

  pauseEventListener () {
    if (this.handleEvent) {
      this.window.removeEventListener('keydown', this.handleEvent)
      // this.window.addEventListener('keyDown', this.pauseEventHandler)
    }
  }

  resumeEventListener () {
    if(this.gameIsOver()) {
      this.gameOver()
    } else {
      if (this.handleEvent) {
        // this.window.removeEventListener('keydown', this.pauseEventHandler)
        this.window.addEventListener('keydown', this.handleEvent)
      }
    }
  }
}
