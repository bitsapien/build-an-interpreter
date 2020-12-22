const lexer = require('../../src/lexer')

test('tokenizes basic assign and add expression', () => {
  const statement = 'let x = 5 + 5;'

  const tokens = lexer(statement)

  expect(tokens).toStrictEqual([
    {
      type: 'LET',
      literal: 'let'
    },
    {
      type: 'IDENTIFIER',
      literal: 'x'
    },
    {
      type: 'ASSIGN',
      literal: '='
    },
    {
      type: 'INTEGER',
      literal: '5'
    },
    {
      type: 'PLUS_OP',
      literal: '+'
    },
    {
      type: 'INTEGER',
      literal: '5'
    },
    {
      type: 'SEMICOLON',
      literal: ';'
    },
    {
      type: 'EOF',
      literal: ''
    }
  ])
})
