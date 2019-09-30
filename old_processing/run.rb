require 'bundler/setup'
require 'mongo'
require 'incrementalist'
require_relative 'translations'


Mongo::Logger.logger.level = Logger::FATAL

MONGO_CONFIG = {
  db: 'translations',
  collection: 'node',
  user: 'root',
  password: 'example',
  auth_source: 'admin',
}

data = Incrementalist::Adapter::Mongo.new MONGO_CONFIG
crawler = Incrementalist::TreeCrawler.new data

crawler.seed type: 'root', file: '../input/data.yml'
crawler.producer type: 'root' do |item|
  require 'yaml'
  filename = File.join __dir__, item.fetch(:file)
  data = YAML.load_file filename

  xs = []
  data.values.flatten.each { |word|
    xs.push type: 'word', value: word
  }
  xs
end
crawler.producer type: 'word' do |item|
  xs = []

  word = item.fetch :value
  print "#{word} "
  got = Translations.get word
  if !got.first
    exit 0
  else
    translation = got.first
    puts translation['words'][0]['translations'][0]['term']
    xs.push type: 'translation', value: translation
  end

  xs
end


loop do
  sleep 1 + 1/[*1..9].sample.round(2)
  got = crawler.step
  if got != :ok
    p got
    break
  end
  # break # XXX
end
