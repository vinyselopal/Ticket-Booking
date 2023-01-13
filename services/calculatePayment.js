const fs = require('fs')
const paymentData = JSON.parse(fs.readFileSync('./data/paymentData.json', 'utf8'))

const calculatePayment = (totalPassengers, paymentMethod) => {
  const discount = paymentData.discounts[paymentMethod]
  const additionalFees = Object.values(paymentData['additional-fees'])
    .reduce((prev, curr) => prev + curr, 0)
  const ticket = paymentData.ticket

  const paymentPerUser = Math.ceil(ticket *
    (1 - (discount / 100)) *
    (1 + (additionalFees / 100))
  )

  return { paymentPerUser, totalPayment: paymentPerUser * totalPassengers }
}

module.exports = { calculatePayment }
