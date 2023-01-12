const fs = require('fs')
const { passengerParser } = require('./services/passengerParser')
const { bookSeats } = require('./services/bookSeats')
const { allocateSeats } = require('./services/allocateSeats')
const readline = require('readline').createInterface(process.stdin)

const getAvailableSeats = (bus, totalPassengers) => {
  return bus.filter(seat => seat.bookedBy).map(seat => seat.seatNumber)
}

const main = (input, bus, bookings) => {
  const {totalPassengers, paymentMethod, passengers} = input
  const availableSeats = getAvailableSeats(bus, totalPassengers)
  
  if (!availableSeats.length) {
    console.log('Sorry,  seats not available')
    return 'Sorry, seats not available'
  }

  const allocatedSeats = allocateSeats(unbookedSeats, totalPassengers)
  const paymentAmount = calculatePayment(totalPassengers, paymentMethod)

  bookSeats(bus, allocatedSeats, passengers)

  const output = 'Total Amount: ' + paymentAmount +
  '\n' + 'Seats alloted: ' +
  bookedSeats.map(seatNumber => 'S' + seatNumber)
    .join(' ')

  console.log(output)
  return output
}

const getUserInput = () => {
  let busTemplate = JSON.parse(fs.readFileSync('./data/bus.json'))
  const bookings = []

  let input = {
    totalPassengers: 0,
    passengers: [],
    paymentMethod: null
  }

  let lineNumber = -1

  const readInputs = (line) => {
    lineNumber++

    if (lineNumber === 0) {
      const totalPassengers = parseInt(line.trim())
      input.totalPassengers = totalPassengers
    } else if (lineNumber <= input.totalPassengers) {
      input.passengers.push(passengerParser(line))
    }
    if (lineNumber > input.totalPassengers) {
      input.paymentMethod = line
      { busTemplate, bookings } = main(input, busTemplate, bookings)
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
