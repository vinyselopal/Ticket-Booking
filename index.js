const readline = require('readline').createInterface(process.stdin, process.stdout)
const fs = require('fs')
const util = require('node:util')

const bus = JSON.parse(fs.readFileSync('./data/bus.json'))

const { bookSeats } = require('./services/bookSeats')
const { allocateSeats, allocateSeat } = require('./services/allocateSeats')
const { calculatePayment } = require('./services/calculatePayment')
const { inputParser } = require('./services/parsers')

const getAvailableSeats = (bus) => {
  return bus.filter(seat => !seat.bookedBy).map(seat => seat.seatNumber)
}

const checkCopassenger = (bus, allocatedSeat, gender) => {
  return bus[bus[allocatedSeat - 1].adjacent - 1].bookedBy?.gender === gender ||
  !bus[bus[allocatedSeat - 1].adjacent - 1].bookedBy
}

const confirmBooking = async (rl) => {
  const question = util.promisify(rl.question).bind(rl)
  const response = await question(`no available seats besides same gender, 
      do you still want to book the seat? y/n\n`)

  if (response === 'y' || response === 'Y') {
    return true
  }
  return false
}

const main = async (input) => {
  const { totalPassengers, paymentMethod, passengers } = input
  const availableSeats = getAvailableSeats(bus, totalPassengers)

  const allocatedSeats = totalPassengers === 1
    ? allocateSeat(availableSeats, bus, passengers)
    : allocateSeats(availableSeats, totalPassengers)

  if (!allocatedSeats.length) {
    console.log('sorry no seats available')
    return 'sorry no seats available'
  }

  if (allocatedSeats.length === 1) {
    if (!checkCopassenger(bus, allocatedSeats[0], passengers[0].gender)) {
      const bookingConfirmed = await confirmBooking(readline)

      if (!bookingConfirmed) {
        console.log('Sorry, no seats opposite to same gender')
        return 'Sorry, no seats opposite to same gender'
      }
    }
  }

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
      const totalPassengers = inputParser('totalPassengers', line)
      if (!totalPassengers) {
        console.log('not a valid input for number of passengers\n')
        lineNumber = -1
        return
      }
      input.totalPassengers = totalPassengers
    } else if (lineNumber <= input.totalPassengers) {
      const passenger = inputParser('passenger', line)
      if (!passenger) {
        console.log('not valid passenger details')
        lineNumber = -1
        return
      }
      input.passengers.push(passenger)
    }
    if (lineNumber > input.totalPassengers) {
      const paymentMethod = inputParser('paymentMethod', line)
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
  main,
  getUserInput
}
