const { bookSeats } = require('./services/bookSeats')
const { passengerParser } = require('./services/passengerParser')
const fs = require('fs')
const readline = require('readline').createInterface(process.stdin)

const main = (input) => {
  const busTemplate = JSON.parse(fs.readFileSync('./data/bus.json'))
  const seatsBookedData = bookSeats(input, busTemplate)
  if (!seatsBookedData) {
    console.log('Sorry,  seats not available')
    return 'Sorry, seats not available'
  }

  const { paymentAmount, bookings } = seatsBookedData
  const output = 'Total Amount: ' + paymentAmount +
  '\n' + 'Seats alloted: ' +
  bookings.map(seatNumber => 'S' + seatNumber)
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
    lineNumber++

    if (lineNumber === 0) {
      const totalPassengers = parseInt(line.trim())
      input.totalPassengers = totalPassengers
    } else if (lineNumber <= input.totalPassengers) {
      input.passengers.push(passengerParser(line))
    }
    if (lineNumber > input.totalPassengers) {
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
