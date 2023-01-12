const { bookSeats } = require('../services/bookSeats')
const fs = require('fs')
const busTemplate = JSON.parse(fs.readFileSync('./data/bus.json', 'utf8'))

const mockInput = {
  totalPassengers: 1,
  passengers: [{ name: 'Viny', age: 24, gender: 'F' }],
  paymentMethod: 'card'
}

test('return paymentAmount and bookings', () => {
  expect(bookSeats(mockInput, busTemplate)
  )
    .toStrictEqual({
      paymentAmount: 517.4,
      bookings: [1]
    })
})
