const LET_TOKEN = 'LET'
const RETURN_TOKEN = 'RETURN'
const IDENTIFIER_TOKEN = 'IDENTIFIER'
const ASSIGN_TOKEN = 'ASSIGN'
const INTEGER_TOKEN = 'INTEGER'

const tokenAt = (tokens, currentPosition) => tokens[currentPosition]

const prattParser = () => 'something'

const parseExpression = (tokens, currentPosition) => {
  const currentToken = tokenAt(tokens, currentPosition)
  if (currentToken.type === INTEGER_TOKEN) {
    return parseIntegerLiteral(currentToken)
  } else {
    const dontKnowHowToParse = `Dont know how to parse this ${currentToken}`
    throw dontKnowHowToParse
  }
}

const parseIntegerLiteral = token => ({ constant: { token: token } })

const parseLetStatement = (tokens, currentPosition) => {
  // let a = b;
  const identifierToken = tokenAt(tokens, currentPosition + 1)
  const assignToken = tokenAt(tokens, currentPosition + 2)
  // Extract right side of statement for expression
  const expectedExpressionPosition = currentPosition + 3
  const expression = parseExpression(tokens, expectedExpressionPosition)

  // Catch parse Errors
  if (identifierToken.type !== IDENTIFIER_TOKEN) {
    const identifierMissingError = `Identifier expected after LET keyword at ${currentPosition}`
    throw identifierMissingError
  }

  if (assignToken.type !== ASSIGN_TOKEN) {
    const assignOperatorMissing = `Assignment operator expected in LET statement at ${currentPosition}`
    throw assignOperatorMissing
  }

  return {
    newVariable: {
      name: {
        identifier: { token: identifierToken }
      },
      value: { expression }
    }
  }

}

const parseReturnStatement = (tokens, currentPosition) => {
  const expression = parseExpression(tokens, currentPosition + 1)
  return {
    returnStatement: {
      value: { expression }
    }
  }
}

const parseStatement = (tokens, currentPosition) => {
  switch (tokenAt(tokens, currentPosition).type) {
    case LET_TOKEN:
      return parseLetStatement(tokens, currentPosition)
    case RETURN_TOKEN:
      return parseReturnStatement(tokens, currentPosition)
    default:
      return parseExpressionStatement(tokens, currentPosition)
  }
}

module.exports = { prattParser, parseLetStatement, parseReturnStatement }


