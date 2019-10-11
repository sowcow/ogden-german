require 'json'

# dumped mongo "node" collection as a json file
file = File.expand_path '~/Downloads/node'
input = File.read file
input = JSON.load input

relevant = input.select { |x| x['type'] == 'translation' && !x['value']['ignore'] }
relevant.map! { |x| x['value'] }
p relevant.count

require 'pp'
# PP.pp relevant.first #.keys

DE = /mp3\/DE/
EN = /mp3\/EN/

got = []
relevant.each { |x|
  # p x.keys
  answers = x['words']
  .select { |x|
    x['audio'] =~ EN
  }
  .map { |x|
    # + x['lessCommonTranslations']
    x['translations']
      .select { |x|
        x['audio'] =~ DE
      }
  }
  .flatten.map { |x|
    word = { word: x['term'] }
    case x['type']
    when /mascu/ then word['gender'] = 'm'
    when /femin/ then word['gender'] = 'f'
    when /neutra/ then word['gender'] = 'n'
    end
    word
  }
  item = {
    question: x['query'],
    answers: answers,
  }
  got.push item
}

p got.count # 850
p got.select { |x| x[:answers].count == 0 }
# [{:question=>"who", :answers=>[]}, {:question=>"so", :answers=>[]}, {:question=>"rice", :answers=>[]}]
got.reject! { |x| x[:answers].count == 0 }


json = JSON.pretty_generate got
File.write 'generated.json', json
system 'cp generated.json ../frontend/src/app/data'
