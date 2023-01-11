const { main, getUserInput, bookSeats, calculatePayment, passengerParser, resetSeatsData } = require('./index')
const fs = require('fs')
const moment = require('moment')

const paymentData = JSON.parse(fs.readFileSync('./paymentData.json', 'utf8'))
const seatsString = fs.readFileSync('./seats.json', 'utf8')

const mockInput = {
  totalPassengers: 1,
  passengers: [{ name: 'Viny', age: 24, gender: 'F' }],
  paymentMethod: 'card'
}

test('return new seats data and bookings', () => {
  expect(bookSeats(
    [
      {
        seatNumber: 1,
        bookedBy: null,
        bookedAt: null
      }
    ],
    mockInput)
  )
    .toStrictEqual({
      bookings: ['S1'],
      newSeats:
        [
          {
            seatNumber: 1,
            bookedBy: { name: 'Viny', age: 24, gender: 'F' },
            bookedAt: moment().format('MMMM Do YYYY, h:mm:ss a')
          }
        ]

    })
})

test('calculate payment', () => {
  expect(calculatePayment(paymentData, mockInput))
    .toBe(517.4)
})

test('return output string for user', () => {
  expect(main({
    totalPassengers: 1,
    passengers: [
      {
        name: 'A',
        age: 20,
        gender: 'F'
      }
    ],
    paymentMethod: 'card'
  }))
    .toBe('Total Amount: 517.4\nSeats alloted: S1')
})

test('parses passenger details string', () => {
  expect(passengerParser('A 20 F'))
    .toStrictEqual({
      name: 'A',
      age: 20,
      gender: 'F'
    })
})
