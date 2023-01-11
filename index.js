const fs = require('fs')

const inputParser = (input) => {
  const [totalPassengersString, ...rest] = input.split('\n')

  const paymentMethod = rest[rest.length - 1]
  const passengersStrings = rest.slice(0, rest.length - 1)
  console.log(rest)

  const parsedPassengers = passengersStrings.map(passenger => {
    const [name, ageString, gender] = passenger.split(' ')
    return { name, age: parseInt(ageString, 10), gender }
  })
  return {
    totalPassengers: parseInt(totalPassengersString, 10),
    passengers: parsedPassengers,
    paymentMethod
  }
}

const calculatePayment = (paymentData, numberOfSeats, paymentMethod) => {
  const discount = paymentData.discounts[paymentMethod]
  const additionalFees = Object.values(paymentData['additional-fees']).reduce((prev, curr) => prev + curr, 0)
  const ticket = paymentData.ticket

  const paymentAmount = ticket * (1 - (discount / 100)) * (1 + (additionalFees / 100)) * numberOfSeats
  return paymentAmount
}

const main = (input) => {
  const seats = JSON.parse(fs.readFileSync('./seats.json', 'utf8'))

  const { totalPassengers, passengers, paymentMethod } = inputParser(input)
  const { bookings, newSeats } = bookSeats(JSON.stringify(seats), totalPassengers, passengers)

  if (!bookings.length) {
    return 'Failed, seats are not available'
  }

  const paymentData = JSON.parse(fs.readFileSync('./paymentData.json', 'utf8'))

  const paymentAmount = calculatePayment(paymentData, totalPassengers, paymentMethod)

  fs.writeFileSync('./seats.json', JSON.stringify(newSeats))
  const output = 'Total Amount: ' + paymentAmount + '\n' + 'Seats alloted: ' + bookings.join(' ')

  return output
}

const bookSeats = (seats, totalPassengers, passengers) => {
  const newSeats = JSON.parse(seats)
  const bookedSeats = seats.bookedSeats

  if (totalPassengers > bookedSeats) {
    return {
      bookings: [],
      newSeats
    }
  }

  const bookings = []
  let counter = 0

  newSeats.seats.forEach((seat) => {
    if (!seat.bookedBy && counter < passengers.length) {
      bookings.push('S' + seat.seatNumber)
      seat.bookedBy = passengers[counter].name
      counter++
    }
  })

  newSeats.unbookedSeats = newSeats.unbookedSeats - passengers.length

  return {
    bookings,
    newSeats
  }
}

module.exports = {
  main,
  inputParser,
  bookSeats,
  calculatePayment
}
