const lexer = require('../../src/lexer')

const expectation1 = [
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
]

const expectation2 = [
  {
    literal: 'let',
    type: 'LET'
  },
  {
    literal: 'five',
    type: 'IDENTIFIER'
  },
  {
    literal: '=',
    type: 'ASSIGN'
  },
  {
    literal: '5',
    type: 'INTEGER'
  },
  {
    literal: ';',
    type: 'SEMICOLON'
  },
  {
    literal: 'let',
    type: 'LET'
  },
  {
    literal: 'ten',
    type: 'IDENTIFIER'
  },
  {
    literal: '=',
    type: 'ASSIGN'
  },
  {
    literal: '10',
    type: 'INTEGER'
  },
  {
    literal: ';',
    type: 'SEMICOLON'
  },
  {
    literal: 'let',
    type: 'LET'
  },
  {
    literal: 'add',
    type: 'IDENTIFIER'
  },
  {
    literal: '=',
    type: 'ASSIGN'
  },
  {
    literal: 'fn',
    type: 'FUNCTION'
  },
  {
    literal: '(',
    type: 'LEFT_PARANS'
  },
  {
    literal: 'x',
    type: 'IDENTIFIER'
  },
  {
    literal: ',',
    type: 'COMMA'
  },
  {
    literal: 'y',
    type: 'IDENTIFIER'
  },
  {
    literal: ')',
    type: 'RIGHT_PARENS'
  },
  {
    literal: '{',
    type: 'LEFT_BRACES'
  },
  {
    literal: 'x',
    type: 'IDENTIFIER'
  },
  {
    literal: '+',
    type: 'PLUS_OP'
  },
  {
    literal: 'y',
    type: 'IDENTIFIER'
  },
  {
    literal: ';',
    type: 'SEMICOLON'
  },
  {
    literal: '}',
    type: 'RIGHT_BRACES'
  },
  {
    literal: ';',
    type: 'SEMICOLON'
  },
  {
    literal: 'let',
    type: 'LET'
  },
  {
    literal: 'result',
    type: 'IDENTIFIER'
  },
  {
    literal: '=',
    type: 'ASSIGN'
  },
  {
    literal: 'add',
    type: 'IDENTIFIER'
  },
  {
    literal: '(',
    type: 'LEFT_PARANS'
  },
  {
    literal: 'five',
    type: 'IDENTIFIER'
  },
  {
    literal: ',',
    type: 'COMMA'
  },
  {
    literal: 'ten',
    type: 'IDENTIFIER'
  },
  {
    literal: ')',
    type: 'RIGHT_PARENS'
  },
  {
    literal: ';',
    type: 'SEMICOLON'
  },
  {
    literal: '',
    type: 'EOF'
  }
]

const tests = [
  ['basic assign and add expression', 'let x = 5 + 5;', expectation1],
  ['functions now', `let five = 5;
                     let ten = 10;
                     let add = fn(x, y) {
                       x + y;
                      };
                      let result = add(five, ten);`, expectation2]

]

describe('lexer fun', () => {
  test.each(tests)('%s | %s', (description, input, expectation) => {
    expect(lexer(input)).toStrictEqual(expectation)
  })
})
