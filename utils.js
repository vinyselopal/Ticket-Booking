const fs = require('fs')
const paymentMethods = JSON.parse(fs.readFileSync('./data/paymentData.json', 'utf8')).paymentMethods

const validateNumberOfPassengers = (input) => !isNaN(input)
const validatePaymentMethod = (input) => paymentMethods.find(obj => obj.method === input && obj.enabled)
module.exports = { validateNumberOfPassengers, validatePaymentMethod }
