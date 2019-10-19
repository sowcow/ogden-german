# Ogden German

Desktop in-browesr app.

- See a word in english.
- Type it in german.
- See if you typed it right.
- Your score reflects that.
- There is a time limit.
- The list of words is taken from Ogden's Basic English vocabulary with omition of ~5 words.
- Abundant list of translations has been automatically generated
- Some niceties like drawing images for words for yourself

## Status

- [X] Application part working as I need it
- [X] Very nice file with translations
- [X] Images (you draw your own right on the page :lol:)
- [ ] Spaced repitition - simple Leitner system mod
- [ ] Example sentences??? - we shall see
  * check the file size if they all are in one file
  * decide on how to store them: separate/opt-in/cache?
- [ ] Menu
  * color choice? or right click for the wheel?
  * clearing current image
  * exporting images
  * importing images

## Motivation

Technically I want to get my german vocabulary recognition to some level.
But this reverse way should also acheive that by casting more light on basic vocabulary gaps in a nice environment.

## Future

- have translations in a yaml file so that they are editable and generate json from there
- words usage examples
  * I have example sentences with translations ready
  * But adding them should increase the data file size significally (currently the file is 400k with no examples)
- spaced repitition (use local storage)
- not sure about expanding it into other languages
  * requires a menu in the ui
  * local storage to remember the choice
  * multiple language json files
  * dynamic loading of language json files
  * translations should be generateable easily but they
    are not complete and require manual handling by somebody interested anyway
