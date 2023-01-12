const {
  main
} = require('../index')

const fs = require('fs')

const paymentData = JSON.parse(fs.readFileSync('./data/paymentData.json', 'utf8'))
const busTemplate = JSON.parse(fs.readFileSync('./data/bus.json', 'utf8'))

const mockInput = {
  totalPassengers: 1,
  passengers: [{ name: 'Viny', age: 24, gender: 'F' }],
  paymentMethod: 'card'
}

test('return output string for user', () => {
  expect(main(mockInput))
    .toBe('Total Amount: 517.4\nSeats alloted: S1')
})
