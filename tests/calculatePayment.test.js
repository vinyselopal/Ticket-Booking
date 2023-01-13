const { calculatePayment } = require('../services/calculatePayment')

test('calculate payment', () => {
  expect(calculatePayment(1, 'card'))
    .toStrictEqual({
      paymentPerUser: 518,
      totalPayment: 518
    })
})

test('calculate payment', () => {
  expect(calculatePayment(2, 'net-banking'))
    .toStrictEqual({
      paymentPerUser: 515,
      totalPayment: 1030
    })
})

test('calculate payment', () => {
  expect(calculatePayment(3, 'net-banking'))
    .toStrictEqual({
      paymentPerUser: 515,
      totalPayment: 1545
    })
})
