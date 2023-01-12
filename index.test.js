const {
  main,
  getUserInput,
  selectSeats,
  bookSeats,
  calculatePayment,
  passengerParser,
  resetSeatsData
} = require('./index')

const fs = require('fs')

const paymentData = JSON.parse(fs.readFileSync('./data/paymentData.json', 'utf8'))
const seatsString = fs.readFileSync('./data/bus.json', 'utf8')

const mockInput = {
  totalPassengers: 1,
  passengers: [{ name: 'Viny', age: 24, gender: 'F' }],
  paymentMethod: 'card'
}

test('return new seats data and bookings', () => {
  expect(bookSeats(mockInput)
  )
    .toStrictEqual('Total Amount: 517.4\nSeats alloted: S1')
})

test('calculate payment', () => {
  expect(calculatePayment(paymentData, mockInput))
    .toBe(517.4)
})

test('return output string for user', () => {
  expect(main(mockInput))
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

test('selects consecutive seats', () => {
  expect(selectSeats(['S1', 'S3', 'S4', 'S5', 'S7', 'S8', 'S9', 'S10'], 4))
    .toStrictEqual(['S7', 'S8', 'S9', 'S10'])
})
