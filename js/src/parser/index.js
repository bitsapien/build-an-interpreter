const LET_TOKEN = 'LET'
const RETURN_TOKEN = 'RETURN'
const IDENTIFIER_TOKEN = 'IDENTIFIER'
const ASSIGN_TOKEN = 'ASSIGN'
const INTEGER_TOKEN = 'INTEGER'

const tokenAt = (tokens, currentPosition) => tokens[currentPosition]

// ------------------------------------ EXPRESSIONS -------------------------------------------------------
const parseExpressionStatement = (tokens, currentPosition) => {
  const currentToken = tokenAt(tokens, currentPosition)
  // send to Pratt Parser
  return { expression: prattParser(tokens, currentPosition) }

  if (currentToken.type === INTEGER_TOKEN) {
    return { expression: parseIntegerLiteral(currentToken) }
  } else if (currentToken.type === IDENTIFIER_TOKEN) {
    return { expression: parseIdentifierToken(currentToken) }
  } else {
    const dontKnowHowToParse = `Dont know how to parse this ${currentToken.literal}`
    throw dontKnowHowToParse
  }
}

const parseIntegerLiteral = token => ({ constant: { token: token } })
const parseIdentifierToken = token => ({ identifier: { token: token } })


const prattParser = (token, currentPosition) => {



}

const infixNode = (left, right, operator) => ({ operator, left, right })
const prefixNode = (left, right, operator) => ({ operator, left, right })


// ------------------------------------ /EXPRESSIONS -------------------------------------------------------
// ------------------------------------ STATEMENTS -------------------------------------------------------
const parseLetStatement = (tokens, currentPosition) => {
  // let a = b;
  const identifierToken = tokenAt(tokens, currentPosition + 1)
  const assignToken = tokenAt(tokens, currentPosition + 2)
  // Extract right side of statement for expression
  const expectedExpressionPosition = currentPosition + 3
  const expression = parseExpressionStatement(tokens, expectedExpressionPosition)

  // Catch parse Errors
  if (identifierToken.type !== IDENTIFIER_TOKEN) {
    const identifierMissingError = `Identifier expected after LET keyword at ${currentPosition}`
    throw identifierMissingError
  }

  const identifier = parseIdentifierToken(identifierToken)

  if (assignToken.type !== ASSIGN_TOKEN) {
    const assignOperatorMissing = `Assignment operator expected in LET statement at ${currentPosition}`
    throw assignOperatorMissing
  }

  return treeNode({ name: identifier }, LET_TOKEN, { value: expression})
}

const parseReturnStatement = (tokens, currentPosition) => {
  const expression = parseExpressionStatement(tokens, currentPosition + 1)
  return treeNode()
  return {
    returnStatement: {
      value: expression
    }
  }
}
// ------------------------------------ /STATEMENTS -------------------------------------------------------
// ----------------------------------- Tree Helpers -------------------------------------------------------
const treeNode = (left, right, center) => ({ center, children: { left, right } })


// --------------------------------- AST STRINGIFICATION --------------------------------------------------
const stringifyExpression = expressionAST => {
  if (expressionAST.identifier) {
    return expressionAST.identifier.token.literal
  } else if (expressionAST.constant) {
    return expressionAST.constant.token.literal
  }
}
const stringifyAST = ast => {
  let program = ''
  ast.statements.forEach(statement => {
    if (statement.letStatement) {
      program += `let ${statement.letStatement.name.identifier.token.literal} = ${stringifyExpression(statement.letStatement.value.expression)};`
    } else if (statement.returnStatement) {
      program += `return ${stringifyExpression(statement.returnStatement.value.expression)};`
    } else if (statement.expression) {
      program += `${stringifyExpression(statement.expression)};`
    }
  })
  return program
}
// --------------------------------- /AST STRINGIFICATION -------------------------------------------------

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

module.exports = { parseStatement, stringifyAST, parseExpressionStatement, parseLetStatement, parseReturnStatement }
