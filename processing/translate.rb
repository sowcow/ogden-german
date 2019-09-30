module Translate
  module_function

  HARDCODE = {
    'door' => [{
      word: 'Tür',
      gender: ?f,
      category: nil,
    }],
    'stiff' => [
      'steif',
      'starr',
      'unbeweglich',
    ],
    'late' => [
      'spät',
      'verspätet'
    ],
  }
  HARDCODE.each { |key, xs|
    xs.map! { |x|
      if x.is_a? String
        { word: x, gender: nil, category: nil }
      else
        x
      end
    }
    xs.each { |item|
      item[:original] = key
    }
  }

  def translate word, check_alternatives = true
    return HARDCODE[word] if HARDCODE[word]

    got = `dict -d eng-deu '#{word}' 2> /dev/null`
    if got.empty?
      if check_alternatives
        alternatives = [
          "to #{word}",
          "#{word}s",
        ]
        found = alternatives.find { |x| translate(x, false).count > 0 }
        return translate found, false if found

        puts "ERROR: ------- NOT FOUND ANYTHING FOR: #{word}"
      end

      return []
    end

    words = []

    parts = got.scan /From.+?(?:\z|(?=From))/m
    parts.each { |part|
      stuff = part.strip.lines.last.strip.split(?,).map(&:strip)
      words.push *stuff
    }

    words.map { |x| parse_word x, word }
  end

  def parse_word given_word, original
    word = given_word.clone

    gender = word[GENDER, 1]
    word[GENDER] = '' if gender

    category = word[CATEGORY, 1]
    word[CATEGORY] = '' if category

    word.strip!
    # if word =~ /\s/
    #   puts "WARNING: found spaces in a word: #{word}, given: #{given_word}, original: #{original}"
    # end
    {
      word: word,
      gender: gender,
      category: category,
      original: original
    }
  end
  GENDER = /<([fmn])>/
  CATEGORY = /\[(.+)\]/
end


if __FILE__ == $0
  require 'pp'
  PP.pp Translate.translate 'line'
end
