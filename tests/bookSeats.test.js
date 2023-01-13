const { bookSeats } = require('../services/bookSeats')

test('mutates bus data', () => {
  const bus = [
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

  bookSeats(bus, allocatedSeats, passengers)

  allocatedSeats.forEach((seat, index) => {
    expect(bus[seat - 1].bookedBy)
      .toStrictEqual(passengers[index])
  })
})
