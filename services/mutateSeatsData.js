const mutateSeatsData = (seats, key, data, bus) => {
  const seatsData = bus.seats
  let counter = 0

  seatsData.forEach(seat => {
    if (counter < data.length &&
        ('S' + seat.seatNumber) === seats[counter]) {
      seat[key] = data[counter]
      counter++
    }
  })
}

module.exports = { mutateSeatsData }
