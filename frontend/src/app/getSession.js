import BrowserStorage from './logic/BrowserStorage';
import Session from './logic/Session';

let sessionSingleton = null

function getSession(allCards) {
  if (sessionSingleton) return sessionSingleton
  let storage = new BrowserStorage(allCards)
  sessionSingleton = new Session(storage)
  return sessionSingleton
}

export default getSession
