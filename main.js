const fs = require('fs')
const readline = require('readline').createInterface(process.stdin, process.stdout)

const bus = JSON.parse(fs.readFileSync('./data/bus.json'))
const bookings = []

const util = require('node:util')

const { bookSeats } = require('./services/bookSeats')
const { getSeats } = require('./services/getSeats')
const { calculatePayment } = require('./services/calculatePayment')

const createOutputString = (paymentAmount, allocatedSeats) => {
  const seatsStr = allocatedSeats.map(seatNumber => 'S' + seatNumber)
    .join(' ')
  return `Total Amount: ${paymentAmount}\nSeats alloted: ${seatsStr}`
}

const confirmBooking = async (rl) => {
  const question = util.promisify(rl.question).bind(rl)
  const response = await question(`no available seats besides same gender, 
        do you still want to book the seat? y/n\n`)

  return (response === 'y' || response === 'Y')
}

const main = async (input) => {
  const { totalPassengers, paymentMethod, passengers } = input

  const { allocatedSeats, shouldConfirmSeat } = getSeats(bus, passengers)

  if (!allocatedSeats.length) {
    console.log('sorry no seats available')
    return 'sorry no seats available'
  }

  if (shouldConfirmSeat && !(await confirmBooking(readline))) {
    console.log('Sorry, no seats opposite to same gender')
    return 'Sorry, no seats opposite to same gender'
  }

  const { paymentPerUser, totalPayment } = calculatePayment(totalPassengers, paymentMethod)

  bookSeats(bus, allocatedSeats, passengers, bookings, paymentPerUser, paymentMethod)
  const output = createOutputString(totalPayment, allocatedSeats)

  console.log(output)
  return output
}

module.exports = {
  main,
  createOutputString,
  confirmBooking
}
