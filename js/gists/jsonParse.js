// A JSON Parser with better errors

const input = '{"name": "JSON", "output": "yes"}'

const parse = input => lexify(input)

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
    currentPosition = currentPosition + 1
  }

  return tokens
}

const isQuote = char => char === '"'




console.log(parse(input))

