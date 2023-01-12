const {
  main
} = require('./index')

const { bookSeats } = require('./services/bookSeats')
const { selectSeats } = require('./services/selectSeats')
const { calculatePayment } = require('./services/calculatePayment')
const { passengerParser } = require('./services/passengerParser')

const fs = require('fs')

const paymentData = JSON.parse(fs.readFileSync('./data/paymentData.json', 'utf8'))
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
  expect(selectSeats([1, 3, 4, 5, 7, 8, 9, 10], 4))
    .toStrictEqual([7, 8, 9, 10])
})
