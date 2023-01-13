const util = require('node:util')

const allocateSeats = (availableSeats, totalPassengers) => {
  const consecutiveSegments = []
  let segment = [availableSeats[0]]

  for (let i = 1; i < availableSeats.length; i++) {
    if (availableSeats[i] === availableSeats[i - 1] + 1) {
      segment.push(availableSeats[i])
      continue
    }
    consecutiveSegments.push(segment)
    segment = [availableSeats[i]]
  }
  consecutiveSegments.push(segment)

  const bookings = consecutiveSegments
    .sort((a, b) => b.length - a.length)
    .flat()
    .slice(0, totalPassengers)

  return bookings
}

const allocateSeat = async (availableSeats, bus, passengers, rl) => {
  const gender = passengers[0].gender
  const seat = bus.find((seat) => (bus[seat.adjacent - 1].bookedBy?.gender === gender ||
    !bus[seat.adjacent - 1].bookedBy))?.seatNumber

  if (!seat) {
    const question = util.promisify(rl.question).bind(rl)
    const response = await question(`no available seats besides same gender, 
      do you still want to book the seat? y/n\n`)

    if (response === 'y' || response === 'Y') {
      return [availableSeats[0]]
    }
    return []
  }
  return [seat]
}

module.exports = { allocateSeats, allocateSeat }
