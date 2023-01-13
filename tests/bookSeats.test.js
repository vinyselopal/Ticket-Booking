const { bookSeats } = require('../services/bookSeats')

test('mutates bus data', () => {
  let bus = [
    {
      seatNumber: 1,
      bookedBy: null
    },
    {
      seatNumber: 2,
      bookedBy: null
    },
    {
      seatNumber: 3,
      bookedBy: null
    },
    {
      seatNumber: 4,
      bookedBy: null
    }
  ]

  const allocatedSeats = [2, 4]
  const passengers = [
    {
      name: 'A',
      age: 21,
      gender: 'F'
    },
    {
      name: 'B',
      age: 21,
      gender: 'NBQ'
    }]

  const bookings = []
  bus = bookSeats(bus, allocatedSeats, passengers, bookings, 100, 'card')

  allocatedSeats.forEach((seat, index) => {
    expect(bus[seat - 1].bookedBy)
      .toStrictEqual(passengers[index])
  })
  expect(bookings.length).toStrictEqual(2)

  const passenger = {
    name: 'B',
    age: 21,
    gender: 'NBQ'
  }

  bookSeats(bus, [1], [passenger], bookings, 100, 'card')
  expect(bus[0].bookedBy)
    .toStrictEqual(passenger)
})
