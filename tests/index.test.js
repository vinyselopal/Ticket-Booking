const {
  main
} = require('../index')

const fs = require('fs')

const bus = JSON.parse(fs.readFileSync('./data/bus.json', 'utf8'))
const bookings = []
const input = {
  totalPassengers: 1,
  passengers: [{ name: 'Viny', age: 24, gender: 'F' }],
  paymentMethod: 'card'
}

test('return output string for user', () => {
  expect(main(input, bus, bookings))
    .toBe('Total Amount: 517.4\nSeats alloted: S1')
})
