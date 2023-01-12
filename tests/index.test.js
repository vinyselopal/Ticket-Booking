const {
  main
} = require('../index')

const bookings = []
const input = {
  totalPassengers: 1,
  passengers: [{ name: 'Viny', age: 24, gender: 'F' }],
  paymentMethod: 'card'
}

test('return output string for user', () => {
  expect(main(input))
    .toBe('Total Amount: 517.4\nSeats alloted: S1')
})

test('return output string for user', () => {
  expect(main(input))
    .toBe('Total Amount: 517.4\nSeats alloted: S2')
})
