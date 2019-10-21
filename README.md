# Ogden German

Desktop in-browesr app.

- See a word in english.
- Type it in german.
- See if you typed it right.
- Your score reflects that.
- There is a time limit.
- The list of words is taken from Ogden's Basic English vocabulary with omition of ~5 words.
- Abundant list of translations has been automatically generated
- Drawing images for words for yourself (pen pressure is not going to be supported)
- Spaced repitition system

## Status

- [X] Application part working as I need it
- [X] Very nice file with translations
- [X] Images (you draw your own right on the page :lol:)
- [X] Spaced repitition - simple system inspired by Leitner system
- [ ] Settings/menu
  * whether to use timer or not
  * drawing mode or not
  * that "short" info about how to use it
- [ ] Example sentences??? - we shall see
  * check the file size if they all are in one file
  * decide on how to store them: separate/opt-in/cache?
- [ ] Drawing menu
  * color choice? or right click for the wheel?
  * clearing current image
  * exporting images
  * importing images

## Motivation

Technically I want to get my german vocabulary recognition to some level.
But this reverse way should also acheive that by casting more light on basic vocabulary gaps in a nice environment.

## Spaced Repitition

1. Opening/reloading the page starts a session
1. You decide how many cards you want to process in each session
1. You decide how often to perform sessions
1. Wrongly answered words will haunt you
1. Right answers will move words further into the next sessions so you do not see them for some time

## Note

- clearing localStore destroys spaced repitition data
- clearing IndexedDB destroys drawings

## Todo

- timer flickering on unpause after drawing
- check if recording hit/miss misses the answer when timer is out on checking the answer stage
- can the last screen lie about hits/misses? is it hiding some words?
- to add pause for drawing?
- to not allow drawing outside the pause? or to limit when you can do it
- some out of place translations are present

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
