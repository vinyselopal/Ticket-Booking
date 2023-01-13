const util = require('node:util')

const allocateSeats = async (unbookedSeatNumbers, totalPassengers, bus, passengers, rl) => {
  if (totalPassengers === 1) {
    const gender = passengers[0].gender
    const seat = bus.find((seat) => (bus[seat.adjacent - 1].bookedBy?.gender === gender || !bus[seat.adjacent - 1].bookedBy))?.seatNumber

    if (!seat) {
      const question = util.promisify(rl.question).bind(rl)
      const response = await question('no available seats besides same gender, do you still want to book the seat? y/n\n')
      if (response === 'y' || response === 'Y') {
        return [unbookedSeatNumbers[0]]
      }
      return []
    }
    return [seat]
  }

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
    .slice(0, totalPassengers)

  return bookings
}

module.exports = { allocateSeats }
