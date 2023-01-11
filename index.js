const seats = {
  seats: [
    {
      seatNumber: 1,
      bookedBy: null
    },
    {
      seatNumber: 2,
      bookedBy: null
    },
    {
      seatNumber: 3,
      bookedBy: null
    },
    {
      seatNumber: 4,
      bookedBy: null
    }
  ],
  totalSeats: 4,
  unbookedSeats: 4
}

const inputParser = (input) => {
  const [totalPassengersString, ...passengersStrings] = input.split('\n')

  const parsedPassengers = passengersStrings.map(passenger => {
    const [name, ageString, gender] = passenger.split(' ')
    return { name, age: parseInt(ageString, 10), gender }
  })
  return { totalPassengers: parseInt(totalPassengersString, 10), passengers: parsedPassengers }
}

const main = (seats, input) => {
  const { totalPassengers, passengers } = inputParser(input)
  const { bookings, newSeats } = bookSeats(JSON.stringify(seats), totalPassengers, passengers)

  const output = bookings.length ? 'Seats alloted: ' + bookings.join(' ') : 'Failed, seats are not available'
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
  bookSeats
}
