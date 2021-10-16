
const lexer = require('../src/lexer')
const { parseStatement } = require('../src/parser')
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '🐒 > ',
  terminal: false
})

console.log('Welcome to the Monkey REPL')

rl.prompt()

rl.on('line', (line) => {
  console.log(line.trim())
  try {
    const tokens = lexer(line.trim())
    const ast = parseStatement(tokens, 0)
    console.log(tokens)
    console.log(ast)
  } catch (err) {
    console.log(err)
  }
  rl.prompt()
}).on('close', () => {
  console.log('Have a great day!')
  process.exit(0)
})
