const fs = require('fs')
const readline = require('readline').createInterface(process.stdin)

const calculatePayment = (paymentData, numberOfSeats, paymentMethod) => {
  const discount = paymentData.discounts[paymentMethod]
  const additionalFees = Object.values(paymentData['additional-fees']).reduce((prev, curr) => prev + curr, 0)
  const ticket = paymentData.ticket

  const paymentAmount = ticket * (1 - (discount / 100)) * (1 + (additionalFees / 100)) * numberOfSeats
  return paymentAmount
}

const bookSeats = (seats, totalPassengers, passengers) => {
  const newSeats = seats
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
      seat.bookedBy = passengers[counter]
      counter++
    }
  })

  newSeats.unbookedSeats = newSeats.unbookedSeats - passengers.length

  return {
    bookings,
    newSeats
  }
}

const main = (input) => {
  const seats = JSON.parse(fs.readFileSync('./seats2.json', 'utf8'))

  const { totalPassengers, passengers, paymentMethod } = input
  const { bookings, newSeats } = bookSeats(seats, totalPassengers, passengers)

  if (!bookings.length) {
    return console.log('Failed, seats are not available')
  }

  const paymentData = JSON.parse(fs.readFileSync('./paymentData.json', 'utf8'))

  const paymentAmount = calculatePayment(paymentData, totalPassengers, paymentMethod)

  fs.writeFileSync('./seats2.json', JSON.stringify(newSeats))
  const output = 'Total Amount: ' + paymentAmount + '\n' + 'Seats alloted: ' + bookings.join(' ')

  console.log(output)
  return output
}

const passengerParser = (input) => {
  const [name, ageString, gender] = input.split(' ')
  return { name, age: parseInt(ageString, 10), gender }
}

const getUserInput = () => {
  const input = {
    totalPassengers: 0,
    passengers: [],
    paymentMethod: null
  }

  let lineNumber = -1

  const readInputs = (line) => {
    lineNumber++

    if (lineNumber === 0) {
      const totalPassengers = parseInt(line.trim())
      input.totalPassengers = totalPassengers
    } else if (lineNumber <= input.totalPassengers) {
      input.passengers.push(passengerParser(line))
    }
    if (lineNumber > input.totalPassengers) {
      input.paymentMethod = line
      readline.close()
    }
  }

  readline.on('line', readInputs)
  readline.on('close', () => main(input))
}

getUserInput()

module.exports = {
  main,
  getUserInput,
  bookSeats,
  calculatePayment,
  passengerParser
}
