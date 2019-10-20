class MemoryStorage {
  constructor(allCards, cardPoints = {}, cardDeltas = {}, point = 0) {
    this.lastPoint = point
    this.allCards = allCards
    this.cardPoints = cardPoints
    this.cardDeltas = cardDeltas
  }

  getAllCards() {
    return this.allCards
  }

  getCardPoints() {
    return this.cardPoints
  }

  getNewPoint() {
    let point = this.lastPoint + 1
    this.lastPoint = point
    return point
  }

  getDelta(id) {
    return this.cardDeltas[id] || 1
  }

  recordDelta(id, value) {
    this.cardDeltas[id] = value
  }

  recordPoint(id, value) {
    this.cardPoints[id] = value
  }
}

export default MemoryStorage
