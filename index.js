const fs = require('fs')
const { passengerParser } = require('./services/passengerParser')
const { bookSeats } = require('./services/bookSeats')
const { allocateSeats } = require('./services/allocateSeats')
const { calculatePayment } = require('./services/calculatePayment')
const { validatePaymentMethod } = require('./utils')
const readline = require('readline').createInterface(process.stdin)

const bus = JSON.parse(fs.readFileSync('./data/bus.json'))

const getAvailableSeats = (bus) => {
  return bus.filter(seat => !seat.bookedBy).map(seat => seat.seatNumber)
}

const main = (input) => {
  const { totalPassengers, paymentMethod, passengers } = input
  const availableSeats = getAvailableSeats(bus, totalPassengers)

  if (!availableSeats.length) {
    console.log('Sorry,  seats not available')
    return 'Sorry, seats not available'
  }

  const allocatedSeats = allocateSeats(availableSeats, totalPassengers)
  const paymentAmount = calculatePayment(totalPassengers, paymentMethod)

  bookSeats(bus, allocatedSeats, passengers)
  const output = 'Total Amount: ' + paymentAmount +
  '\n' + 'Seats alloted: ' +
  allocatedSeats.map(seatNumber => 'S' + seatNumber)
    .join(' ')

  console.log(output)
  return output
}

const getUserInput = () => {
  let input = {
    totalPassengers: 0,
    passengers: [],
    paymentMethod: null
  }

  let lineNumber = -1

  const readInputs = (line) => {
    console.log('ln', lineNumber)
    lineNumber++

    if (lineNumber === 0) {
      const totalPassengers = parseInt(line.trim())
      console.log(totalPassengers)
      if (isNaN(totalPassengers)) {
        console.log('not a valid input for number of passengers')
        lineNumber = -1
      }
      input.totalPassengers = totalPassengers
    } else if (lineNumber <= input.totalPassengers) {
      input.passengers.push(passengerParser(line))
    }
    if (lineNumber > input.totalPassengers) {
      if (!validatePaymentMethod(line)) {
        console.log('not a valid payment method')
        lineNumber = -1
        return
      }
      input.paymentMethod = line
      main(input)

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
  main,
  getUserInput
}
