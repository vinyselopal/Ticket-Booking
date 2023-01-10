const { main, inputParser, bookSeats } = require('./index')

const mockAvailableSeats = {
  seats: [
    {
      seatNumber: 1,
      bookedBy: null
    }
  ],
  totalSeats: 1,
  unbookedSeats: 1
}

const mockUnavailableSeats = {
  seats: [
    {
      seatNumber: 1,
      bookedBy: 'Person1'
    }
  ],
  totalSeats: 1,
  unbookedSeats: 0
}

test('return new seats data and bookings', () => {
  expect(bookSeats(JSON.stringify(mockAvailableSeats),
    1,
    [{ name: 'Viny', age: 24, gender: 'F' }])
  )
    .toStrictEqual({
      bookings: ['S1'],
      newSeats: {
        seats: [
          {
            seatNumber: 1,
            bookedBy: 'Viny'
          }
        ],
        totalSeats: 1,
        unbookedSeats: 0
      }
    })
})

test('book seat (available)', () => {
  expect(main(mockAvailableSeats, '1\nViny Selopal 24 F'))
    .toBe('Seats alloted: S1')
})

test('parse input', () => {
  expect(inputParser('1\nViny 24 F'))
    .toStrictEqual({ totalPassengers: 1, passengers: [{ name: 'Viny', age: 24, gender: 'F' }] })
})

test('book seat (unavailable)', () => {
  expect(main(mockUnavailableSeats, '1\nViny Selopal 24 F'))
    .toBe('Failed, seats are not available')
})
