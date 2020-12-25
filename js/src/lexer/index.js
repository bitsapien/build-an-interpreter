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
  tokens.push({ type: 'EOF', literal: '' })
  return tokens
}

const indentifyToken = (char, position, statements) => {
  let nextPosition = position + 1
  const op = operators[char]
  if (op) {
    // checking for EQ and NOT_EQ
    if (statements[nextPosition] === '=') {
      if (char === '=') {
        return [{
          type: 'EQ',
          literal: char + '='
        }, (nextPosition + 1)]
      } else if (char === '!') {
        return [{
          type: 'NOT_EQ',
          literal: char + '='
        }, (nextPosition + 1)]
      }
    } else {
      return [{
        type: op,
        literal: char
      }, nextPosition]
    }
  } else {
    // peek forward for more
    const valid = isValidKeywordOrIdentifier(char)
    if (valid) {
      while (nextPosition < statements.length) {
        const nextChar = statements[nextPosition]
        const nextValid = isValidKeywordOrIdentifier(nextChar) || isEQNOTEQ(nextChar)
        if (nextValid) {
          nextPosition = nextPosition + 1
        } else {
          return [categoriseKeywordOrIdentifier(statements.slice(position, nextPosition)), nextPosition]
        }
      }
    } else if (char === ' ' || char === '\n' || char === '\t') {
      return [-1, nextPosition]
    }
  }
}

const isValidKeywordOrIdentifier = char => /[\w]/g.test(char)
const isEQNOTEQ = char => char === '=' || char === '!'
const isIdentifierOrConstant = word => /^[a-zA-Z]\w*/g.test(word) ? { type: 'IDENTIFIER', literal: word } : isNumber(word) ? { type: 'INTEGER', literal: word } : { type: 'GIBBERISH', literal: word }

const isNumber = word => /^\d*/.test(word)

const categoriseKeywordOrIdentifier = token => keywords[token] ? { type: keywords[token], literal: token } : isIdentifierOrConstant(token)

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
  ',': 'COMMA'
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
