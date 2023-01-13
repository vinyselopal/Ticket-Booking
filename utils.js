const fs = require('fs')

const paymentData = JSON.parse(fs.readFileSync('./data/paymentData.json', 'utf8'))

const bus = JSON.parse(fs.readFileSync('./data/bus.json'))

const paymentMethodParser = (line) => paymentData.paymentMethods
  .find(obj => obj.method === line && obj.enabled)?.method ||
  null

const passengerParser = (line) => {
  const [name, ageString, gender] = line.split(' ')
  const age = parseInt(ageString, 10)
  if (isNaN(ageString) || !['M', 'F', 'NBQ'].includes(gender)) {
    return null
  }
  return { name, age, gender }
}

const totalPassengersParser = (line) => {
  const totalPassengers = parseInt(line.trim(), 10)

  if (isNaN(line)) return null
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

const getAvailableSeats = (bus) => {
  return bus.filter(seat => !seat.bookedBy).map(seat => seat.seatNumber)
}

module.exports = {
  paymentMethodParser,
  passengerParser,
  paymentData,
  totalPassengersParser,
  inputParser,
  parsers,
  getAvailableSeats,
  bus
}
