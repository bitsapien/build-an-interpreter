
const lexer = require('../src/lexer')
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
    const output = lexer(line.trim())
    console.log(output)
  } catch (err) {
    console.log(err)
  }
  rl.prompt()
}).on('close', () => {
  console.log('Have a great day!')
  process.exit(0)
})
