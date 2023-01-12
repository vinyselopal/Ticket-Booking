const allocateSeats = (unbookedSeatNumbers, totalPassengers) => {
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
