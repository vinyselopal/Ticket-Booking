const { calculatePayment } = require('../services/calculatePayment')

test('calculate payment', () => {
  expect(calculatePayment(1, 'card'))
    .toBe(517.4)
})

test('calculate payment', () => {
  expect(calculatePayment(2, 'net-banking'))
    .toBe(1029.6000000000001)
})
