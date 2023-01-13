const fs = require('fs')
const readline = require('readline').createInterface(process.stdin, process.stdout)

const bus = JSON.parse(fs.readFileSync('./data/bus.json'))
const bookings = []

const util = require('node:util')

const { bookSeats } = require('./services/bookSeats')
const { allocateSeats, allocateSeat } = require('./services/allocateSeats')
const { calculatePayment } = require('./services/calculatePayment')

const getAvailableSeats = (bus) => {
  return bus.filter(seat => !seat.bookedBy).map(seat => seat.seatNumber)
}

const checkCopassenger = (bus, allocatedSeat, gender) => {
  return bus[bus[allocatedSeat - 1].adjacent - 1].bookedBy?.gender === gender ||
    !bus[bus[allocatedSeat - 1].adjacent - 1].bookedBy
}

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
  const availableSeats = getAvailableSeats(bus, totalPassengers)

  const allocatedSeats = allocateSeats(availableSeats, totalPassengers, bus, passengers)

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

  const { paymentPerUser, totalPayment } = calculatePayment(totalPassengers, paymentMethod)

  bookSeats(bus, allocatedSeats, passengers, bookings, paymentPerUser, paymentMethod)
  const output = createOutputString(totalPayment, allocatedSeats)

  console.log(output)
  return output
}

module.exports = {
  main,
  checkCopassenger,
  createOutputString,
  confirmBooking,
  getAvailableSeats
}
