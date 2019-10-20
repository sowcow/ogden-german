import Deck from './Deck'
import Player from './Player'
import { sortBy } from 'lodash'

class Session {
  constructor(storage) {
    this.storage = storage

    let allCards = this.storage.getAllCards()
    let cardPoints = this.storage.getCardPoints()
    let point = this.storage.getNewPoint()
    this.point = point

    let {
      zeroDeck,
      sessionDeck
    } = getDecks(allCards, cardPoints, point)

    let player = new Player(sessionDeck, zeroDeck)
    this.player = player
  }

  takeNextCard() {
    let card = this.player.takeNextCard()
    this.lastCard = card
    return card
  }

  // delta = 1 for new cards from the zero deck
  // so on the first right answer you get it in the second next session
  recordHit() {
    let id = this.lastCard.id
    let delta = this.storage.getDelta(id) + 1
    let point = this.point + delta
    this.storage.recordDelta(id, delta)
    this.storage.recordPoint(id, point)
  }

  recordMiss() {
    let id = this.lastCard.id
    let delta = 1
    let point = this.point + delta
    this.storage.recordDelta(id, delta)
    this.storage.recordPoint(id, point)
  }
}

function getDecks(allCards, cardPoints, point) {
  let zeroCards = allCards.filter(x => !cardPoints[x.id])
  let zeroDeck = new Deck(zeroCards)

  let readyIds = getReadyCardIds(cardPoints, point)
  let sessionCards = readyIds.map(id =>
    allCards.find(x => x.id == id)
  )
  let sessionDeck = new Deck(sessionCards)

  return {
    zeroDeck,
    sessionDeck,
  }
}

function getReadyCardIds(cardPoints, point) {
  let result = Object.entries(cardPoints)
    .filter(([id, cardPoint]) =>
      cardPoint <= point
    )
  result = sortBy(result, x => x[0]) // id
  return result.map(([id, _point]) => id)
}

export default Session
