const readline = require('readline').createInterface(process.stdin)

const allocateSeats = async (unbookedSeatNumbers, totalPassengers, bus, passengers) => {
  if (totalPassengers === 1) {
    const gender = passengers[0].gender
    const seat = bus.find((seat, index) => (seat[index - 1]?.bookedBy.gender === gender ||
  seat[index + 1]?.bookedBy.gender === gender) && unbookedSeatNumbers.includes(seat.seatNumber))
    if (seat) {
      return [seat]
    }
    const response = await readline.question('no seats beside same gender. Still book? y/n')
    console.log(response)
    if (response === 'y' || response === 'Y') return [unbookedSeatNumbers[0]]
    return []
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
