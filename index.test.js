const { main, getUserInput, bookSeats, calculatePayment, passengerParser } = require('./index')
const fs = require('fs')

const paymentData = JSON.parse(fs.readFileSync('./paymentData.json', 'utf8'))
const seatsString = fs.readFileSync('./seats.json', 'utf8')

test('return new seats data and bookings', () => {
  expect(bookSeats(seatsString,
    1,
    [{ name: 'Viny', age: 24, gender: 'F' }])
  )
    .toStrictEqual({
      bookings: ['S1'],
      newSeats: {
        seats: [
          {
            seatNumber: 1,
            bookedBy: 'Viny'
          }
        ],
        totalSeats: 1,
        unbookedSeats: 0
      }
    })
})

// test('parse input', () => {
//   expect(inputParser('1\nViny 24 F\ncard'))
//     .toStrictEqual({ totalPassengers: 1, passengers: [{ name: 'Viny', age: 24, gender: 'F' }], paymentMethod: 'card' })
// })

test('calculate payment', () => {
  expect(calculatePayment(paymentData, 2, 'card'))
    .toBe(1034.8)
})

test('book seat (available)', () => {
  expect(main('1\nViny 24 F\ncard'))
    .toBe('Total Amount: 517.4\nSeats alloted: S1')
})
