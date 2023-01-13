const {
  main
} = require('../index')

test('return output string for user', () => {
  const input = {
    totalPassengers: 1,
    passengers: [{ name: 'A', age: 21, gender: 'F' }],
    paymentMethod: 'card'
  }
  expect(main(input))
    .toBe('Total Amount: 517.4\nSeats alloted: S1')
})

test('return output string for user', () => {
  const input = {
    totalPassengers: 2,
    passengers: [
      {
        name: 'A',
        age: 12,
        gender: 'M'
      },
      {
        name: 'B',
        age: 40,
        gender: 'M'
      }],
    paymentMethod: 'net-banking'
  }
  expect(main(input))
    .toBe('Total Amount: 517.4\nSeats alloted: S1, S2')
})
