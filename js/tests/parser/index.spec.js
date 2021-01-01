const { prattParser, parseLetStatement, parseReturnStatement } = require('../../src/parser')
const lexer = require('../../src/lexer')

const program1 = {
  errors: [],
  statements: [{
    expressionStatments: {
      expression: {
        identifier: {
          tokenLiteral: 'foobar',
          value: 'foobar'
        }
      }
    }
  }]
}

const tests = [
  ['identifier expression', 'foobar;', program1],
]

describe('pratt parser fun', () => {
  test.each(tests)('%s | %s', (_, input, expectation) => {
    const tokens = lexer(input)
    const program = prattParser(tokens)
    //expect(program).toStrictEqual(expectation)
  })
})


// Parse LET statement

const tokens1 = lexer('let a = 6;')
const ast1 = {
  newVariable: {
    name: {
      identifier: { token: { type: 'IDENTIFIER', literal: 'a' } }
    },
    value: {
      expression: { constant: { token: { type: 'INTEGER', literal: '6' } } }
    }
  }
}

// Parse RETURN statement
const tokens2 = lexer('return 70;')
const ast2 = {
  returnStatement: {
    value: {
      expression: { constant: { token: { type: 'INTEGER', literal: '70' } } }
    }
  }
}

const parseStatementTests = [
  ['parse let statement constant assignment | let a = 6', tokens1, 0, parseLetStatement, ast1],
  ['parse return statement constant assignment | return 70', tokens2, 0, parseReturnStatement, ast2],
]

describe('parse let statement', () => {
  test.each(parseStatementTests)('%s | %s', (_, tokens, currentPosition, functionUnderTest, expectation) => {
    const program = functionUnderTest(tokens, currentPosition)
    expect(program).toStrictEqual(expectation)
  })
})

