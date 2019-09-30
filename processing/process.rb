require 'yaml'
require_relative 'translate'

file = File.join __dir__, '../input/data.yml'
data = YAML.load_file file

all_words = data.values.flatten
p all_words.count

translations = {}
all_words.each { |x|
  got = Translate.translate x
  original = got.first[:original]
  flag = original == x ? '' : " ~ #{original}"
  puts "#{x} - #{got.map{|x| x[:word]}.join(?,)}#{flag}"

  got.each { |x|
    x.delete :original
    x.reject! { |k,v| v.nil? }
  }
  translations[original] = got
}

require 'json'
data = JSON.load JSON.dump translations
yaml = YAML.dump data
File.write 'translations.yml', yaml

