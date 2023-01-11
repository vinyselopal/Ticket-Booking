const { main, getUserInput, bookSeats, calculatePayment, passengerParser, resetSeatsData } = require('./index')
const fs = require('fs')

const paymentData = JSON.parse(fs.readFileSync('./paymentData.json', 'utf8'))
const seatsString = fs.readFileSync('./seats.json', 'utf8')

test('return new seats data and bookings', () => {
  expect(bookSeats(
    [
      {
        seatNumber: 1,
        bookedBy: null,
        bookedAt: null
      }
    ],
    1,
    [{ name: 'Viny', age: 24, gender: 'F' }])
  )
    .toStrictEqual({
      bookings: ['S1'],
      newSeats:
        [
          {
            seatNumber: 1,
            bookedBy: { name: 'Viny', age: 24, gender: 'F' },
            bookedAt: null
          }
        ]

    })
})

test('calculate payment', () => {
  expect(calculatePayment(paymentData, 2, 'card'))
    .toBe(1034.8)
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
