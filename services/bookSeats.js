const { calculatePayment } = require('./calculatePayment')
const moment = require('moment')
const { selectSeats } = require('./selectSeats')
const { mutateSeatsData } = require('./mutateSeatsData')
const fs = require('fs')

const bookSeats = (input) => {
  const bus = JSON.parse(fs.readFileSync('./data/bus.json', 'utf8'))
  const seats = bus.seats

  const unbookedSeats = seats.filter(seat => !seat.bookedBy)
    .map(seat => 'S' + seat.seatNumber)

  const { totalPassengers, passengers } = input

  if (totalPassengers > unbookedSeats.length) {
    return null
  }

  const bookings = selectSeats(unbookedSeats, totalPassengers)

  const bookedAtArr = []
  const paymentDataArr = []
  const timeStamp = moment().format('MMMM Do YYYY, h:mm:ss a')

  const paymentData = JSON.parse(fs.readFileSync('./data/paymentData.json', 'utf8'))

  const paymentAmount = calculatePayment(paymentData, input)

  for (let i = 0; i < bookings.length; i++) {
    bookedAtArr.push(timeStamp)
  }

  for (let i = 0; i < bookings.length; i++) {
    paymentDataArr.push({
      paymentAmount,
      paymentMethod: input.paymentMethod
    })
  }

  mutateSeatsData(bookings, 'bookedBy', passengers)
  mutateSeatsData(bookings, 'bookedAt', bookedAtArr)

  return {
    paymentAmount,
    bookings
  }
}

module.exports = { bookSeats }
