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

const calculatePayment = (paymentData, input) => {
  const { totalPassengers, paymentMethod } = input
  const discount = paymentData.discounts[paymentMethod]
  const additionalFees = Object.values(paymentData['additional-fees']).reduce((prev, curr) => prev + curr, 0)
  const ticket = paymentData.ticket

  const paymentAmount = ticket * (1 - (discount / 100)) * (1 + (additionalFees / 100)) * totalPassengers
  return paymentAmount
}

const mutateSeatsData = (seats, key, data) => {
  const seatsData = JSON.parse(fs.readFileSync('./seats.json', 'utf8'))
  let counter = 0

  seatsData.forEach(seat => {
    if (counter < data.length && ('S' + seat.seatNumber) === seats[counter]) {
      seat[key] = data[counter]
      counter++
    }
  })

  fs.writeFileSync('./seats.json', JSON.stringify(seatsData))
}

const selectSeats = (unbookedSeats, totalPassengers) => {
  const unbookedSeatNumbers = unbookedSeats.map(seat => parseInt(seat.slice(1), 10))

  const consecutiveSegments = []
  let segment = [unbookedSeatNumbers[0]]

  for (let i = 1; i < unbookedSeatNumbers.length; i++) {
    if (unbookedSeatNumbers[i] === unbookedSeatNumbers[i - 1] + 1) {
      segment.push(unbookedSeatNumbers[i])
      continue
    }
    consecutiveSegments.push(segment)
    segment = [unbookedSeatNumbers[i]]
  }
  consecutiveSegments.push(segment)

  const bookings = consecutiveSegments
    .sort((a, b) => b.length - a.length)
    .flat()
    .slice(0, totalPassengers).map(seat => 'S' + seat)

  return bookings
}

const bookSeats = (input) => {
  const seats = JSON.parse(fs.readFileSync('./seats.json', 'utf8'))
  const unbookedSeats = seats.filter(seat => !seat.bookedBy).map(seat => 'S' + seat.seatNumber)

  const { totalPassengers, passengers } = input

  if (totalPassengers > unbookedSeats.length) {
    throw Error('Seats not available')
  }

  const bookings = selectSeats(unbookedSeats, totalPassengers)

  const bookedAtArr = []
  const paymentDataArr = []
  const timeStamp = moment().format('MMMM Do YYYY, h:mm:ss a')

  const paymentData = JSON.parse(fs.readFileSync('./paymentData.json', 'utf8'))

  const paymentAmount = calculatePayment(paymentData, input)

  for (let i = 0; i < bookings.length; i++) {
    bookedAtArr.push(timeStamp)
  }

  for (let i = 0; i < bookings.length; i++) {
    paymentDataArr.push({
      paymentAmount,
      paymentMethod: input.paymentMethod
    })
  }

  mutateSeatsData(bookings, 'bookedBy', passengers)
  mutateSeatsData(bookings, 'bookedAt', bookedAtArr)
  mutateSeatsData(bookings, 'paymentDetails', paymentDataArr)

  const output = 'Total Amount: ' + paymentAmount + '\n' + 'Seats alloted: ' + bookings.join(' ')

  return output
}

const main = (input) => {
  try {
    const output = bookSeats(input)
    console.log(output)
    return output
  } catch (err) {
    console.log(err)
    return err
  }
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
  resetSeatsData,
  selectSeats
}
