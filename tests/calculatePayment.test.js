const { calculatePayment } = require('../services/calculatePayment')

const totalPassengers = 1
const paymentMethod = 'card'

test('calculate payment', () => {
  expect(calculatePayment(totalPassengers, paymentMethod))
    .toBe(517.4)
})
