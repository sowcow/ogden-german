const CARD_POINTS_KEY = 'CARD_POINTS_KEY'
const CARD_DELTAS_KEY = 'CARD_DELTAS_KEY'
const LAST_POINT_KEY = 'LAST_POINT_KEY'

function storageGet(key, defaultValue) {
  let got = localStorage.getItem(key)
  if (got) return JSON.parse(got)
  return defaultValue
}
function storageSet(key, value) {
  value = JSON.stringify(value)
  localStorage.setItem(key, value)
}

class BrowserStorage {
  constructor(allCards) {
    this.allCards = allCards
  }

  getAllCards() {
    return this.allCards
  }

  getCardPoints() {
    return storageGet(CARD_POINTS_KEY, {})
  }

  _getLastPoint() {
    return storageGet(LAST_POINT_KEY, 0)
  }
  _setLastPoint(value) {
    storageSet(LAST_POINT_KEY, value)
  }

  getNewPoint() {
    let point = this._getLastPoint() + 1
    this._setLastPoint(point)
    return point
  }

  _getCardDeltas() {
    return storageGet(CARD_DELTAS_KEY, {})
  }

  getDelta(id) {
    return this._getCardDeltas()[id] || 1
  }

  recordDelta(id, value) {
    let data = this._getCardDeltas()
    data[id] = value
    storageSet(CARD_DELTAS_KEY, data)
  }

  recordPoint(id, value) {
    let data = this.getCardPoints()
    data[id] = value
    storageSet(CARD_POINTS_KEY, data)
  }
}

export default BrowserStorage
