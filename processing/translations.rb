require 'json'

module Translations
  FROM = 'en'
  TO = 'de'

  def self.get word
    # translation = `trans -b #{FROM}:#{TO} #{word}`.strip
    translation = `node lin.js #{word}`.strip
    translation == '' ? [] : [JSON.load(translation)]
  end
end

if __FILE__ == $0
  t = Translations.get 'cook'
  p t
end
