const util = require('node:util')

const allocateSeats = (availableSeats, totalPassengers) => {
  if (!availableSeats.length) {
    return []
  }
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

const findSeat = (availableSeats, bus, gender) => {
  const seatNumber = availableSeats.find((seat) => (bus[bus[seat - 1].adjacent - 1].bookedBy?.gender === gender ||
  !bus[bus[seat - 1].adjacent - 1].bookedBy))
  return seatNumber
}

const allocateSeat = async (availableSeats, bus, passengers, rl) => {
  if (!availableSeats.length) {
    return []
  }

  const gender = passengers[0].gender
  const seat = findSeat(availableSeats, bus, gender)

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

module.exports = { allocateSeats, allocateSeat, findSeat }
