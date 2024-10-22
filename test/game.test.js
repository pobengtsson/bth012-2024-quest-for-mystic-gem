import { Game } from "../html/game.mjs"
import { Setup } from "../html/states/setup.mjs"
import { GameOn } from "../html/states/gameon.mjs"

const windowMock = {
  removeEventListener: vi.fn(),
  addEventListener: vi.fn(),
  document: {
    getElementById: vi.fn()
  }
}
const screenMock = {
  applyHtmlTemplate: vi.fn()
}
const mockPrng = vi.fn()
mockPrng.mockReturnValue(1)

describe ('Game', ()=> {
  describe ('when created', () => {
    let game
    let setStateSpy
    beforeEach (()=>{
      game = new Game(windowMock, screenMock, mockPrng)
    })
    it('has the screen', () => {
      expect(game.screen).toBe(screenMock)
    })
    it('has the window', () => {
      expect(game.window).toBe(windowMock)
    })
    it('does not have a handleEvent', () => {
      expect(game.handleEvent).toBeUndefined()
    })
    describe('when start', () => {
      beforeEach(()=>{
        setStateSpy = vi.spyOn(game, 'setState')
        setStateSpy.mockResolvedValue()
        game.start()
      })
      it('sets the Setup state', () => {
        expect(setStateSpy.mock.calls[0][0]).toBeInstanceOf(Setup)
      })
    })
    describe('when startGame', () => {
      beforeEach(() => {
        setStateSpy = vi.spyOn(game, 'setState')
        setStateSpy.mockResolvedValue()
        game.startGame()
      })
      it('sets the Setup state', () => {
        expect(setStateSpy.mock.calls[0][0]).toBeInstanceOf(GameOn)
      })
    })
    describe('setState', async () => {
      let mockState
      beforeEach(async ()=>{
        mockState = {
          handleEvent: { bind: (_) => { return {} } },
          loadView: vi.fn()
        }
        game.setState(mockState)
      })
      it('has set an eventhandler', () => {
        expect(game.handleEvent).toBeTruthy()
      })
      it('sets the window listener', () => {
        expect(windowMock.addEventListener).toHaveBeenCalled()
      })
      it('loads the view of the new state', () => {
        expect(mockState.loadView).toHaveBeenCalled()
      })
      it()
    })
  })
})
