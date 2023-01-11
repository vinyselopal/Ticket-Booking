const fs = require('fs')
const moment = require('moment')
const readline = require('readline').createInterface(process.stdin)

const resetSeatsData = () => {
  const seats = JSON.parse(fs.readFileSync('./seats.json', 'utf8'))

  const newSeatsData = seats.map(seat => {
    return { ...seat, bookedBy: null }
  })

  fs.writeFileSync('./seats.json', JSON.stringify(newSeatsData))
}

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

  const bookedAt = moment().format('MMMM Do YYYY, h:mm:ss a')

  newSeats.forEach((seat) => {
    if (!seat.bookedBy && counter < passengers.length) {
      bookings.push('S' + seat.seatNumber)
      seat.bookedBy = passengers[counter]
      seat.bookedAt = bookedAt
      counter++
    }
  })

  return {
    bookings,
    newSeats
  }
}

const main = (input) => {
  const seats = JSON.parse(fs.readFileSync('./seats.json', 'utf8'))

  const { totalPassengers, passengers, paymentMethod } = input
  const { bookings, newSeats } = bookSeats(seats, totalPassengers, passengers)

  if (!bookings.length) {
    return console.log('Failed, seats are not available')
  }

  const paymentData = JSON.parse(fs.readFileSync('./paymentData.json', 'utf8'))

  const paymentAmount = calculatePayment(paymentData, totalPassengers, paymentMethod)

  fs.writeFileSync('./seats.json', JSON.stringify(newSeats))
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
resetSeatsData()
getUserInput()

module.exports = {
  main,
  getUserInput,
  bookSeats,
  calculatePayment,
  passengerParser,
  resetSeatsData
}
