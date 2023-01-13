const fs = require('fs')
const paymentData = JSON.parse(fs.readFileSync('./data/paymentData.json', 'utf8'))

const paymentMethodParser = (line) => paymentData.paymentMethods
  .find(obj => obj.method === line && obj.enabled)?.method ||
  null

const passengerParser = (line) => {
  const [name, ageString, gender] = line.split(' ')
  const age = parseInt(ageString, 10)
  if (isNaN(ageString) || !['M', 'F', 'NBQ'].includes(gender) || age < 0) {
    return null
  }
  return { name, age, gender }
}

const totalPassengersParser = (line) => {
  const totalPassengers = parseInt(line.trim(), 10)

  if (isNaN(line) || totalPassengers < 0) return null
  return totalPassengers
}

const inputParser = (inputField, line) => {
  return parsers[inputField](line)
}

const parsers = {
  totalPassengers: totalPassengersParser,
  passenger: passengerParser,
  paymentMethod: paymentMethodParser
}

module.exports = {
  paymentMethodParser,
  passengerParser,
  totalPassengersParser,
  inputParser,
  parsers
}
