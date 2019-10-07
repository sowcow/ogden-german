require 'bundler/setup'
require 'mongo'
require 'incrementalist'
require_relative 'translations'

PAUSE = 5 * 60 # sec

Mongo::Logger.logger.level = Logger::FATAL

MONGO_CONFIG = {
  db: 'translations',
  collection: 'node',
  user: 'root',
  password: 'example',
  auth_source: 'admin',
}

def pause
  $steps ||= 0
  $steps += 1
  sleep PAUSE
end

IGNORE = %w[
  a
  I
]

data = Incrementalist::Adapter::Mongo.new MONGO_CONFIG
crawler = Incrementalist::TreeCrawler.new data

crawler.seed type: 'root', file: '../input/data.yml'
crawler.producer type: 'root' do |item|
  require 'yaml'
  filename = File.join __dir__, item.fetch(:file)
  data = YAML.load_file filename

  xs = []
  data.each { |category_name, words|
    words.each { |word|
      xs.push type: 'word', value: word, category_name: category_name
    }
  }
  xs
end
crawler.producer type: 'word' do |item|
  xs = []


  word = item.fetch :value

  if IGNORE.include? word
    xs.push type: 'translation', value: { ignore: true }
  else
    print "#{word} "
    got = Translations.get word
    if !got.first
      puts 'ERROR AFTER %s' % $steps
      exit 0
    else
      translation = got.first
      puts translation['words'][0]['translations'][0]['term']
      xs.push type: 'translation', value: translation
    end
  end


  xs
end


loop do
  got = crawler.step
  if got != :ok
    p got
    break
  end
  # break # XXX

  pause
  sleep 1 + 1/[*1..9].sample.round(2)
end
