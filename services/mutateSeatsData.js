const fs = require('fs')

const mutateSeatsData = (seats, key, data) => {
  const bus = JSON.parse(fs.readFileSync('./data/bus.json', 'utf8'))
  const seatsData = bus.seats
  let counter = 0

  seatsData.forEach(seat => {
    if (counter < data.length &&
        ('S' + seat.seatNumber) === seats[counter]) {
      seat[key] = data[counter]
      counter++
    }
  })

  fs.writeFileSync('./data/bus.json', JSON.stringify({ ...bus, seats: seatsData }))
}

module.exports = { mutateSeatsData }
