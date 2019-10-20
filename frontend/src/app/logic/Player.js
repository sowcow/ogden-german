class Player {
  constructor(sessionDeck, zeroDeck) {
    this.sessionDeck = sessionDeck
    this.zeroDeck = zeroDeck
  }
  takeNextCard() {
    if (this.sessionDeck.hasMore()) {
      return this.sessionDeck.takeNextCard()
    } else {
      return this.zeroDeck.takeNextCard()
    }
  }
}

export default Player
