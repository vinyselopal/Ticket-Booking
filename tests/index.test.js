const {
  main
} = require('../index')

test('return output string for user', async () => {
  const input = {
    totalPassengers: 1,
    passengers: [{ name: 'A', age: 21, gender: 'F' }],
    paymentMethod: 'card'
  }
  expect(await main(input))
    .toBe('Total Amount: 517\nSeats alloted: S1')
})

test('return output string for user', async () => {
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
  expect(await main(input))
    .toBe('Total Amount: 1030\nSeats alloted: S2 S3')
})
