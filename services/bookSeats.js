const bookSeats = (bus, allocatedSeats, passengers, bookings, paymentPerUser, paymentMethod) => {
  let counter = 0

  bus.forEach(seat => {
    if (counter < passengers.length &&
      (seat.seatNumber) === allocatedSeats[counter]) {
      seat.bookedBy = passengers[counter]

      bookings.push({
        passenger: passengers[counter],
        seatNumber: seat.seatNumber,
        paymentAmount: paymentPerUser,
        bookedAt: Date.now(),
        paymentMethod
      })

      counter++
    }
  })

  return bus
}

module.exports = { bookSeats }
