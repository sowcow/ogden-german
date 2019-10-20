class Deck {
  constructor(cards) {
    this.cards = cards
  }
  hasMore() {
    return !!this.cards.length
  }
  takeNextCard() {
    return this.cards.shift()
  }
}

export default Deck
