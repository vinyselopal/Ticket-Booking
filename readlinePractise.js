const readline = require('readline').createInterface(process.stdin)

const inputArr = []
let lineNumber = -1
let size

const readInputs = (line) => {
  inputArr.push(line)
  lineNumber++

  if (lineNumber === 0) {
    console.log('captured first line into variable named size')
    size = parseInt(inputArr[0])
  } else if (lineNumber < size) {
    console.log('capture input' + lineNumber + ' :' + inputArr[lineNumber])
  }
  if (lineNumber === size) {
    readline.close()
  }
}

readline.on('line', readInputs)
readline.on('close', () => console.log(inputArr))
