
const allocateSeats = (availableSeats, totalPassengers) => {
  if (!availableSeats.length || availableSeats.length < totalPassengers) {
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

const allocateSeat = (availableSeats, bus, passengers) => {
  if (!availableSeats.length) {
    return []
  }

  const gender = passengers[0].gender
  const seat = availableSeats.find((seat) => (bus[bus[seat - 1].adjacent - 1]
    .bookedBy?.gender === gender ||
    !bus[bus[seat - 1].adjacent - 1].bookedBy))

  if (!seat) {
    return [availableSeats[0]]
  }
  return [seat]
}

module.exports = { allocateSeats, allocateSeat }
