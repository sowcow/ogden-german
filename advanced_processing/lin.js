var linguee = require('linguee')

let word = process.argv[2]

linguee
  .translate(word, { from: 'eng', to: 'ger' })
  .then(function(response) {
    print(response)
  })
  .catch(function(error) {
    // print({ error })
  })

function print(x) {
  console.log(JSON.stringify(x, null, 2))
}
