const checkCopassenger = (bus, allocatedSeat, gender) => {
  return bus[bus[allocatedSeat - 1].adjacent - 1].bookedBy?.gender === gender ||
    !bus[bus[allocatedSeat - 1].adjacent - 1].bookedBy
}

const getAvailableSeats = (bus) => {
  return bus.filter(seat => !seat.bookedBy).map(seat => seat.seatNumber)
}

const getSeats = (bus, passengers) => {
  const totalPassengers = passengers.length
  const availableSeats = getAvailableSeats(bus, totalPassengers)

  if (totalPassengers === 1) return getOneSeat(availableSeats, bus, passengers)
  if (!availableSeats.length || availableSeats.length < totalPassengers) {
    return { shouldConfirmSeat: false, allocatedSeats: [] }
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

  return { shouldConfirmSeat: false, allocatedSeats: bookings }
}

const getOneSeat = (availableSeats, bus, passengers) => {
  if (!availableSeats.length) {
    return { shouldConfirmSeat: false, allocatedSeats: [] }
  }

  const gender = passengers[0].gender
  const seat = availableSeats.find((seat) => (bus[bus[seat - 1].adjacent - 1]
    .bookedBy?.gender === gender ||
    !bus[bus[seat - 1].adjacent - 1].bookedBy))

  if (!seat) {
    return { shouldConfirmSeat: false, allocatedSeats: [availableSeats[0]] }
  }
  const shouldConfirmSeat = !checkCopassenger(bus, seat, passengers[0].gender)

  return { shouldConfirmSeat, allocatedSeats: [seat] }
}

module.exports = { getSeats, getOneSeat, getAvailableSeats, checkCopassenger }
