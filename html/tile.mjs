export class Tile {
  constructor (aTerrain, isVisited = false, npc) {
    this.terrain = aTerrain
    this.isVisited = isVisited
    this.npc = npc
  }
}
