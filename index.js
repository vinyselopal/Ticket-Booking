const readline = require('readline').createInterface(process.stdin, process.stdout)

const { totalPassengersParser, passengerParser, paymentMethodParser } = require('./services/parsers')
const { main } = require('./main')

const getUserInput = () => {
  console.log('Please enter the input:')

  let input = {
    totalPassengers: 0,
    passengers: [],
    paymentMethod: null
  }

  let lineNumber = -1

  const readInputs = async (line) => {
    lineNumber++

    if (lineNumber === 0) {
      const totalPassengers = totalPassengersParser(line)
      if (!totalPassengers) {
        console.log('not a valid input for number of passengers\n')
        lineNumber = -1
        return
      }
      input.totalPassengers = totalPassengers
    } else if (lineNumber <= input.totalPassengers) {
      const passenger = passengerParser(line)
      if (!passenger) {
        console.log('not valid passenger details')
        lineNumber = -1
        return
      }
      input.passengers.push(passenger)
    }
    if (lineNumber > input.totalPassengers) {
      const paymentMethod = paymentMethodParser(line)
      if (!paymentMethod) {
        console.log('not a valid payment method')
        lineNumber = -1
        return
      }
      input.paymentMethod = line
      await main(input)

      lineNumber = -1
      input = {
        totalPassengers: 0,
        passengers: [],
        paymentMethod: null
      }
    }
  }

  readline.on('line', readInputs)
}

getUserInput()

module.exports = {
  getUserInput
}
