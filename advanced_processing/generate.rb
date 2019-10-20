require 'json'

# dumped mongo "node" collection as a json file
file = File.expand_path './Downloads/node'
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
    xs = []
    xs += x['translations']
    xs += x['lessCommonTranslations'].map { |x| x.merge({ 'l' => 1 }) }

    xs
      .select { |x|
        x['audio'] =~ DE || x['l']
      }
  }
  .flatten.map { |x|
    word = { word: x['term'] }
    word['l'] = 1 if x['l'] == 1
    case x['type']
    when /mascu/ then word['gender'] = 'm'
    when /femin/ then word['gender'] = 'f'
    when /neut/ then word['gender'] = 'n'
    end
    word
  }
  item = {
    id: take_id,
    question: x['query'],
    answers: answers,
  }
  got.push item
}

p got.count # 850
p got.select { |x| x[:answers].count == 0 }
# [{:question=>"who", :answers=>[]}, {:question=>"so", :answers=>[]}, {:question=>"rice", :answers=>[]}]
got.reject! { |x| x[:answers].count == 0 }


# json = JSON.pretty_generate got
json = JSON.dump got
File.write 'generated.json', json
system 'cp generated.json ../frontend/src/app/data/questions.json'

BEGIN {
  $next_id = 0
  def take_id
    id = $next_id
    $next_id += 1
    return id
  end
}
