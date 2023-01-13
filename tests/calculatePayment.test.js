const { calculatePayment } = require('../services/calculatePayment')

test('calculate payment', () => {
  expect(calculatePayment(1, 'card'))
    .toBe(517)
})

test('calculate payment', () => {
  expect(calculatePayment(2, 'net-banking'))
    .toBe(1030)
})

test('calculate payment', () => {
  expect(calculatePayment(3, 'net-banking'))
    .toBe(1544)
})
