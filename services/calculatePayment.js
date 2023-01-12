const calculatePayment = (paymentData, input) => {
  const { totalPassengers, paymentMethod } = input
  const discount = paymentData.discounts[paymentMethod]
  const additionalFees = Object.values(paymentData['additional-fees'])
    .reduce((prev, curr) => prev + curr, 0)
  const ticket = paymentData.ticket

  const paymentAmount = ticket *
    (1 - (discount / 100)) *
    (1 + (additionalFees / 100)) *
    totalPassengers

  return paymentAmount
}

module.exports = { calculatePayment }
