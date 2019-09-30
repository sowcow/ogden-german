file = File.join __dir__, 'text'
text = File.read file

END{
  parser = Parser.new
  text.lines.each { |line|
    parser.feed line.strip
  }
  parser.got.each { |k,v|
    puts "#{k} => #{v.count}"
  }

  require 'yaml'
  yaml = YAML.dump parser.got
  File.write 'data.yml', yaml
}

class Parser
  def initialize
    @state = :header
    @got = {}
  end
  attr_reader :got

  def feed line
    send "#@state", line
  end

  def header line
    if line.empty?
      @state = :body
    else
      @header = line
    end
  end

  def body line
    if line.empty?
      @state = :header
    else
      @got[@header] ||= []
      @got[@header].push *line.scan(/\w+/)
    end
  end
end

