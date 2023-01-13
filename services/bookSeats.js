const bookSeats = (bus, allocatedSeats, passengers) => {
  let counter = 0

  bus.forEach(seat => {
    console.log(seat, allocatedSeats[0], counter, passengers.length)
    if (counter < passengers.length &&
      (seat.seatNumber) === allocatedSeats[counter]) {
      seat.bookedBy = passengers[counter]
      counter++
    }
  })

  return bus
}

module.exports = { bookSeats }
