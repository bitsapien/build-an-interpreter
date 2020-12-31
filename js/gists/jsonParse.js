// A JSON Parser with better errors

const input = '{"name": "JSON", "output": "yes"}'

const strToObj = input => lexify(input)

// Tokenization or Lexification
const lexify = input => {
  const burstedInput = input.split('')
  const tokens = []
  const keychars = {
    '"': 'DOUBLE_QUOTE',
    ':': 'COLON',
    '{': 'LEFT_BRACE',
    '}': 'RIGHT_BRACE',
    ',': 'COMMA'
  }
  let currentPosition = 0;
  while (currentPosition < burstedInput.length) {
    const char = burstedInput[currentPosition]
    let nextPosition = currentPosition + 1
    const keychar = keychars[char]
    if (keychar) {
      tokens.push({ type: keychar, literal: char })
    } else {
      if (char !== ' ' || char !== '\t' || char !== '\n') {
        let nextChar = burstedInput[nextPosition]
        let nextValid = !isQuote(nextChar)
        while (nextPosition < burstedInput.length && nextValid) {
          nextChar = burstedInput[nextPosition]
          nextValid = !isQuote(nextChar)
          if (nextValid) {
            nextPosition = nextPosition + 1
          }
        }
        tokens.push({ type: 'STRING', literal: input.slice(currentPosition, nextPosition) })
        currentPosition = nextPosition
      }
    }
    currentPosition = currentPosition + 1
  }

  return tokens
}

const isQuote = char => char === '"'

// Parsing
const parse = tokens => {
  let position = 0
  while (position < tokens.length) {
    const currentToken = tokens[position]
    if (currentToken.type === 'LEFT_BRACE') {
      const newObject = {}
      // we expect that this have values and it closes
      extractObject(tokens, position)

    }


  }
}

const extractObject = (tokens, position) => {
  let currentPosition = position
  while (position < tokens.length) {
    const currentToken = tokens[currentPosition]
    // look for double qoute
    if (currentToken.type === 'DOUBLE_QUOTE') {
      // get key
      if (tokens[currentPosition + 2].type === 'DOUBLE_QUOTE') {
        key = tokens[currentPosition + 1]
      }

    }



    currentPosition = currentPosition + 1
  }
}

console.log(strToObj(input))

