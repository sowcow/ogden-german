# Ogden German

[:arrow_right: Open the app in the browser](https://sowcow.github.io/ogden-german/)

Desktop in-browser offline app to practice typing ENG -> GER vocabulary translation.

Chill and simple process.

The dictionary used is great but not perfect.
I may create a file for edits to be incorporated if there are propositions to add/fix specific translations.

## Status

It is ready for use. There are fixes pending for small inconveniences.
UI needs some additional looking into but I like it implicit and minimal.

- [X] Application part works as I need it
- [X] Nice translations
- [X] Images (you draw your own right on the page :grinning:)
- [X] Spaced repitition - simple system inspired by Leitner system
- [X] Nice example sentences

## Motivation

I want to get my german vocabulary recognition to some level.
And I have a thing for writing such simple apps.

## Screenshots

![wrong-answer](/shots/wrong.png?raw=true)

![right-answer](/shots/right.png?raw=true)

![final-review](/shots/final.png?raw=true)

## Process

- See a word in english.
- Type it in german.
- See if you typed it right.
- Your score reflects that.
- Hit escape when you are ready to finish.
- Review words by hovering mouse above them on the final screen.
- Incorporate drawing and example sencences if it works for you.

## Bugs

- Drawings does not handle well browser window size changes so keep it same/maxed if you use the feature

## Other

* The list of words is taken from Ogden's Basic English vocabulary (with omition of ~5 words).
* Abundant list of translations has been automatically generated
* Drawing images for words for yourself (pen pressure is not supported by browsers afaik)
* The process may be less effective than the more demanding ones
* Visual features make it not into accessibility
* Requirement for the keyboard is a feature

## Spaced Repitition

1. Opening/reloading the page starts a session
1. You decide how many cards you want to process in each session
1. You decide how often to perform sessions
1. Wrongly answered words will haunt you
1. Right answers will move words further into the next sessions so you do not see them for some time

## Keyboard

This info is also shown when you open the page.

- PageUp - shows english translation of the example / shows the next example
- PageDown - shows german translation of the example / shows the next example
- Insert - toggle drawing mode
- Delete - delete the last line while in the drawing mode
- Enter - check the answer, get the next word
- Esc - finish the session
- Use `ss` and produce umlauts with `a:` or `a"`

## Note

- clearing localStore destroys spaced repitition data
- clearing IndexedDB destroys drawings

## Todo

- some out of place translations are present
- the code have not had any refactoring yet!
- fix the optional predictability thing with all the logic inside components when it comes to words at the final screen for example

## Future

- have translations in a yaml file so that they are editable and generate json from there
- words usage examples
  * I have example sentences with translations ready
  * But adding them should increase the data file size significally (currently the file is 400k with no examples)
- not sure about expanding it into other languages (russian?)
  * requires a menu in the ui
  * local storage to remember the choice
  * multiple language json files
  * dynamic loading of language json files
  * translations should be generateable easily but they
    are not complete and require manual handling by somebody interested anyway
  * forking it for a new language seems like an easy way but idk
- Settings/menu - UNLIKELY
  * whether to use timer or not
  * drawing mode or not
  * that "short" info about how to use it
- Drawing menu - UNLIKELY
  * color choice? or right click for the wheel?
  * clearing current image
  * exporting images
  * importing images
  * not using images at all
