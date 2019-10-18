import { sortBy, sample } from 'lodash'

const SESSION_KEY = 'session_point'
const CARDS_KEY = 'known_cards'

class Session {
  constructor(allCardsData, compareDataBy) {
    this.point = this._startSession()
    let compareCard = x => compareDataBy(x.data)
    let buildIndex = (a, x) => {
      let key = compareCard(x)
      a[key] = x
      return a
    }
    let index = allCardsData.reduce(buildIndex, {})
    let knownCards = this._getKnownCards()

    this.zeroCardsData = allCardsData.filter(x => !index[compareCard(x)])

    this.readyCards = getReadyCards(knownCards, this)
  }

  _updateCards(f) {
    let cards = this._getKnownCards()
    f(cards)
    localStorage.setItem(CARDS_KEY, cards)
  }

  _getKnownCards() {
    let cards = localStorage.getItem(CARDS_KEY)
    if (!cards) {
      cards = []
    }
    return cards
  }

  _startSession() {
    let session = this._readSession() + 1
    localStorage.setItem(SESSION_KEY, session)
    return session
  }

  _readSession() {
    let session = localStorage.getItem(SESSION_KEY)
    if (session) {
      return session
    } else {
      let value = 0
      localStorage.setItem(SESSION_KEY, value)
      return value
    }
  }
}

function wrongAnswer(card, session) {
  let { delta } = card
  delta = Math.min(Math.floor(delta / 2), 1)
  let point = session.point + delta
  let newCard = { ...card, delta, point }
  return newCard
}

function rightAnswer(card, session) {
  let { delta } = card
  delta = delta + 1
  let point = session.point + delta
  let newCard = { ...card, delta, point }
  return newCard
}

function getReadyCards(allCards, session) {
  let result = allCards.filter(x => x.point <= session.point)
  result = sortBy(result, x => x.point)
  return result
}

function cardTake(readyCards, zeroCardsData, session) {
  let card = ready.shift()
  if (card) {
    return card
  } else {
    let data = zeroCardsData.shift()
    let card = cardCreateFromZero(data, session)
    return card
  }
}

function cardCreateFromZero(data, session) {
  return {
    data,
    delta: 0,
    point: session.point,
  }
}
