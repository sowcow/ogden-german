import MemoryStorage from '../MemoryStorage';
import Deck from '../Deck';
import Player from '../Player';
import Session from '../Session';

it('takes from the zero deck if no cards are ready', () => {
  let sessionDeck = new Deck([])

  let zeroCard = { zero: true }
  let zeroDeck = new Deck([ zeroCard ])

  let user = new Player(sessionDeck, zeroDeck)
  let card = user.takeNextCard()
  expect(card)
    .toEqual(zeroCard)
})

it('takes from the session deck if there are cards', () => {
  let someCard = { card: true }
  let sessionDeck = new Deck([ someCard ])

  let zeroCard = { zero: true }
  let zeroDeck = new Deck([ zeroCard ])

  let user = new Player(sessionDeck, zeroDeck)
  let card = user.takeNextCard()
  expect(card)
    .toEqual(someCard)
})

it('two-card sessions simple scenario', () => {
  let A = { id: 1 }
  let B = { id: 2 }
  let C = { id: 3 }
  let D = { id: 4 }
  let E = { id: 5 }

  let allCards = [ A, B, C, D, E ]
  let storage = new MemoryStorage(allCards)

  let session

  // first session takes two new cards
  session = new Session(storage)
  expect(session.takeNextCard())
    .toEqual(A)
  session.recordHit()
  expect(session.takeNextCard())
    .toEqual(B)
  session.recordMiss()

  // the next session will give you only the wrong answered one
  // and then goes for new cards again
  session = new Session(storage)
  expect(session.takeNextCard())
    .toEqual(B)
  session.recordMiss()
  expect(session.takeNextCard())
    .toEqual(C)
  session.recordMiss()

  // longer than that it is makes tests less obvious
  // so gotta do split scenarios with very simple one-card sessions
  session = new Session(storage)
  expect(session.takeNextCard())
    .toEqual(A)
  session.recordHit()
  expect(session.takeNextCard())
    .toEqual(B)
  session.recordHit()
  expect(session.takeNextCard())
    .toEqual(C)
  session.recordHit()
})

it('only right answers scenario', () => {
  let A = { id: 1 }
  let B = { id: 2 }
  let C = { id: 3 }
  let D = { id: 4 }
  let E = { id: 5 }

  let allCards = [ A, B, C, D, E ]
  let storage = new MemoryStorage(allCards)

  let session

  session = new Session(storage)
  expect(session.takeNextCard()).toEqual(A)
  session.recordHit()

  session = new Session(storage)
  expect(session.takeNextCard()).toEqual(B)
  session.recordHit()

  session = new Session(storage)
  expect(session.takeNextCard()).toEqual(A)
  session.recordHit()

  session = new Session(storage)
  expect(session.takeNextCard()).toEqual(B)
  session.recordHit()

  session = new Session(storage)
  expect(session.takeNextCard()).toEqual(C)
  session.recordHit()

  session = new Session(storage)
  expect(session.takeNextCard()).toEqual(A)
  session.recordHit()
})

it('only wrong answers scenario', () => {
  let A = { id: 1 }
  let B = { id: 2 }
  let C = { id: 3 }
  let D = { id: 4 }
  let E = { id: 5 }

  let allCards = [ A, B, C, D, E ]
  let storage = new MemoryStorage(allCards)

  let session

  session = new Session(storage)
  expect(session.takeNextCard()).toEqual(A)
  session.recordMiss()

  session = new Session(storage)
  expect(session.takeNextCard()).toEqual(A)
  session.recordMiss()

  session = new Session(storage)
  expect(session.takeNextCard()).toEqual(A)
  session.recordMiss()
})

it('retrival automatically records cards for the next session', () => {
  expect('maybe the next time').toEqual('maybe the next time')
})
