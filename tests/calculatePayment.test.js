const fs = require('fs')
const { calculatePayment } = require('../services/calculatePayment')
const paymentData = JSON.parse(fs.readFileSync('./data/paymentData.json', 'utf8'))

const mockInput = {
  totalPassengers: 1,
  passengers: [{ name: 'Viny', age: 24, gender: 'F' }],
  paymentMethod: 'card'
}

test('calculate payment', () => {
  expect(calculatePayment(paymentData, mockInput))
    .toBe(517.4)
})
