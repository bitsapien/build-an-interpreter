const lexer = statements => {
  const chars = statements.split('')
  const tokens = []
  let idx = 0
  while (idx < chars.length) {
    const tokenAndPos = indentifyToken(statements[idx], idx, statements)
    if (!tokenAndPos) {
      const error = `Syntax error at character count: ${idx} starting with "${statements[idx]}"`
      throw error
    }
    if (tokenAndPos[0] !== -1) {
      tokens.push(tokenAndPos[0])
    }
    idx = tokenAndPos[1]
  }
  tokens.push(tokenizer('EOF'))
  return tokens
}

const indentifyToken = (char, position, statements) => {
  let nextPosition = position + 1
  const op = operators[char]
  if (op) {
    // checking for EQ and NOT_EQ
    if (statements[nextPosition] === '=') {
      if (char === '=') {
        return [tokenizer('=='), (nextPosition + 1)]
      } else if (char === '!') {
        return [tokenizer('!='), (nextPosition + 1)]
      }
    } else {
      return [tokenizer(char), nextPosition]
    }
  } else {
    // peek forward for more
    const valid = isValidIdentifier(char)
    if (valid) {
      let nextChar = statements[nextPosition]
      let nextValid = isValidIdentifier(nextChar) || isEQNOTEQ(nextChar)
      while (nextPosition < statements.length && nextValid) {
        nextChar = statements[nextPosition]
        nextValid = isValidIdentifier(nextChar) || isEQNOTEQ(nextChar)
        if (nextValid) {
          nextPosition = nextPosition + 1
        }
      }

      return [tokenizer(statements.slice(position, nextPosition)), nextPosition]
    } else if (char === ' ' || char === '\n' || char === '\t') {
      return [-1, nextPosition]
    }
  }
}

const isValidIdentifier = char => /[\w]/g.test(char)
const isEQNOTEQ = char => char === '=' || char === '!'
const isNumber = word => /^\d/.test(word)
const isEOF = literal => literal === 'EOF'
const tokenizer = literal => {
  const type = Object.assign(operators, keywords)[literal]
  if (type) {
    return {
      literal: literal,
      type: type
    }
  } else if (isEOF(literal)) {
    return {
      literal: '',
      type: 'EOF'
    }
  } else if (isNumber(literal)) {
    return {
      literal: literal,
      type: 'INTEGER'
    }
  } else if (isValidIdentifier(literal)) {
    return {
      literal: literal,
      type: 'IDENTIFIER'
    }
  } else {
    return {
      literal: literal,
      type: 'Eh!?😕'
    }
  }
}

const operators = {
  '!': 'BANG',
  '-': 'MINUS',
  '*': 'ASTERIX',
  '/': 'SLASH',
  '<': 'LT',
  '>': 'GT',
  '=': 'ASSIGN',
  '+': 'PLUS_OP',
  ';': 'SEMICOLON',
  '{': 'LEFT_BRACES',
  '}': 'RIGHT_BRACES',
  '(': 'LEFT_PARANS',
  ')': 'RIGHT_PARENS',
  ',': 'COMMA',
  '==': 'EQ',
  '!=': 'NOT_EQ'
}

const keywords = {
  let: 'LET',
  fn: 'FUNCTION',
  return: 'RETURN',
  if: 'IF',
  else: 'ELSE',
  true: 'TRUE',
  false: 'FALSE'
}

module.exports = lexer
