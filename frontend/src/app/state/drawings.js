import Dexie from 'dexie';

const db = new Dexie('DrawingsDatabase')
db.version(1).stores({ drawings: "++id,question,drawing" });
let table = db.drawings

export async function save(question, drawing) {
  return db.transaction('rw', table, async () => {
    let item = await getItem(question)
    let newItem = { question, drawing }
    if (item) {
      let { id } = item
      return table.put({ id, ...newItem })
    } else {
      return table.add(newItem)
    }
  })
}

export function remove(question) {
  return db.transaction('rw', table, async () => {
    let item = await getItem(question)
    if (item) {
      let { id } = item
      return table.delete(id)
    } else {
      return
    }
  })
}

export async function load(question) {
  let item = await getItem(question)
  if (item) {
    return item.drawing
  } else {
    return null
  }
}

export function getItem(question) {
  return table
    .where('question')
    .equals(question)
    .first()
}
