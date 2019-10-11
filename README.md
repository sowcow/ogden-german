# Ogden German

Desktop in-browesr app.

- See a word in english.
- Type it in german.
- See if you typed it right.
- Your score reflects that.
- There is a time limit.
- The list of words is generated from Ogden's Basic English vocabulary.
- Translations are stored in [a text file](processing/translations.yml).
  They are generated with freedict eng-deu dictionary.

## Note

The list of translations has gaps.

## Status

- [X] Application part working as I need it
- [X] Nice list of word translations
- [ ] Words usage examples - maybe I will add them

## Motivation

Technically I want to get my german vocabulary recognition to some level.
But this reverse way should also acheive that by casting more light on basic vocabulary gaps in a nice environment.

## Future

- spaced repitition (use local storage)
- not sure about expanding it into other languages
  * requires a menu in the ui
  * local storage to remember the choice
  * multiple language json files
  * dynamic loading of language json files
  * translations should be generateable easily but they
    are not complete and require manual handling by somebody interested anyway
