import { State } from './state.mjs'
import { GameMap, randomPosition } from '../gamemap.mjs'


function isSamePosition (a, b) {
  return a.x === b.x && a.y === b.y
}

function middlePosition(dim) {
  return Math.floor(dim/2)
}

export class GameOn extends State {
  constructor(theGame, aScreen) {
    super(theGame, aScreen)
    this.game.gameMap = new GameMap({ width: 15, height: 15 })
    this.game.gameMap.playerPos = {
      x: middlePosition(this.game.gameMap.dimensions.width),
      y: middlePosition(this.game.gameMap.dimensions.height)
    }
    this.game.gemPos = randomPosition(this.game.gameMap.dimensions, this.game.prng)
  }

  async loadView() {
    this.screen.classList = ["gameon"]
    this.screen.apply(this.game.gameMap, this.game.gemPos)
    this.game.gameMap.tileAt(this.game.gameMap.playerPos).isVisited = true
    // this.game.gameMap.startPeek(this.game.gameMap.playerPos, this.game.gameMap.playerPos)
    // this.screen.update(this.game.gameMap)
    this.screen.updateHealth(this.game.player.health)
  }

  gemFound () {
    return isSamePosition(this.game.gameMap.playerPos, this.game.gemPos)
  }

  handleEvent (event) {
    update_based_on_event: {
      switch (event.key) {
         case 'ArrowRight':
         case 'ArrowLeft':
         case 'ArrowDown':
         case 'ArrowUp':
            event.preventDefault()
            event.stopPropagation()
            if (!this.gemFound() && this.game.gameMap.isValidPlayerMove(this.game.gameMap.playerPos, event.key)) {
               const nextPosition = this.game.gameMap.nextCoordinates(this.game.gameMap.playerPos, event.key)
               this.game.gameMap.moveFromTo(this.game.gameMap.playerPos, nextPosition)
               this.game.gameMap.playerPos = nextPosition
               this.game.player.moveOneStep()
               this.processNpcs(this.game.gameMap.tileAt(nextPosition))
            } else {
               break update_based_on_event
            }
               break
            case 'Escape':
            case 'Q':
            case 'q':
            case 'P':
            case 'p':
               console.log(`Received event: ${event.key}`)
               // this.gameData.setState(new PausedState(this.gameData))
            break
         default:
            console.log('Default')
            break
      }
      this.screen.updateHealth(this.game.player.health)
      this.screen.update(this.game.gameMap)
    }
    // if (this.gemFound()) {
    //    this.game.gameWon()
    // }
    // if (this.game.gameIsOver()) {
    //   this.game.gameOver()
    // }
  }

  processNpcs (tile) {
    this.game.pauseEventListener()
    if (tile.npc) {
      const actionMessage = tile.npc.getActionMessage(this.screen,
        this.game.player, this.game.gameMap, this.game.gemPos)
      this.screen.processActionMessages(actionMessage,
        () => this.game.resumeEventListener())
      delete tile.npc
    } else {
      this.game.resumeEventListener()
    }
  }
}
