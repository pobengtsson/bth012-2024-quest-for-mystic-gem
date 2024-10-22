import { Player } from "../html/player.mjs"

describe('Player', () => {
  describe('when created', () => {
    let player
    beforeEach(()=> {
      player = new Player('given name')
    })
    it('isHealthy', () => {
      expect(player.isHealthy()).toEqual(true)
    })
    it('has the given name', () => {
      expect(player.name).toEqual('given name')
    })
    it('has health 100', () => {
      expect(player.health).toEqual(100)
    })
    it('inflicts 20 in damage', () => {
      expect(player.damage).toEqual(20)
    })
    describe('when movingOneStep', () => {
      beforeEach(()=>{
        player.moveOneStep()
      })
      it('has reduced health by one', () => {
        expect(player.health).toEqual(99)
      })
      it('is still healthy', () => {
        expect(player.isHealthy()).toEqual(true)
      })
    })
    describe('when hurt by 20', () => {
      beforeEach(()=>{
        player.hurt(20)
      })
      it('has health reduced by 20', () => {
        expect(player.health).toEqual(80)
      })
      it('is still healthy', () => {
        expect(player.isHealthy()).toEqual(true)
      })
    })
    describe('when hurt by more than 100', () => {
      beforeEach(()=>{
        player.hurt(101)
      })
      it('is not healthy', () => {
        expect(player.isHealthy()).toEqual(false)
      })
      it('has decreased the health', () => {
        expect(player.health).toEqual(-1)
      })
    })
    describe('when healed by 15', () => {
      beforeEach(()=>{
        player.heal(15)
      })
      it('is healthy', () => {
        expect(player.isHealthy()).toEqual(true)
      })
      it('has increased the health', () => {
        expect(player.health).toEqual(115)
      })
    })
  })
})
