const { stringifyAST, parseExpressionStatement, parseLetStatement, parseReturnStatement } = require('../../src/parser')
const lexer = require('../../src/lexer')

// Parse LET statement
const ast1 = {
  letStatement: {
    name: {
      identifier: { token: { type: 'IDENTIFIER', literal: 'a' } }
    },
    value: {
      expression: { constant: { token: { type: 'INTEGER', literal: '6' } } }
    }
  }
}

// Parse RETURN statement
const ast2 = {
  returnStatement: {
    value: {
      expression: { constant: { token: { type: 'INTEGER', literal: '70' } } }
    }
  }
}


// Parse expressions
const expressionAST1 = {
  expression: {
    constant: {
      token: {
        type: 'INTEGER',
        literal: '5'
      }
    }
  }
}

const expressionAST2 = {
  expression: {
    identifier: {
      token: {
        type: 'IDENTIFIER',
        literal: 'foobar'
      }
    }
  }
}

// Test Table
const parseStatementExpressionTests = [
  ['parse let statement constant assignment', 'let a = 6', 0, parseLetStatement, ast1],
  ['parse return statement constant assignment', 'return 70', 0, parseReturnStatement, ast2],
  ['parse expression with only a constant', '5;', 0, parseExpressionStatement, expressionAST1],
  ['parse expression with an identifier', 'foobar;', 0, parseExpressionStatement, expressionAST2],
  //['parse expression with single infix', '5 + 6', 0, parseExpressionStatement, expressionAST2]
]

// Just where the tests are run
describe('parse let statement', () => {
  test.each(parseStatementExpressionTests)('%s | %s', (_, code, currentPosition, functionUnderTest, expectation) => {
    const tokens = lexer(code)
    const ast = functionUnderTest(tokens, currentPosition)
    console.log('input: ', code, ' | AST reconstructed: ', stringifyAST({ statements: [ast] }))
    expect(ast).toStrictEqual(expectation)
  })
})

