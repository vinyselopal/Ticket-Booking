const { allocateSeats, allocateSeat, findSeat } = require('../services/allocateSeats')

const bus = [
  {
    seatNumber: 1,
    bookedBy: {
      name: 'A',
      age: 21,
      gender: 'M'
    },
    adjacent: 2
  },
  {
    seatNumber: 2,
    bookedBy: null,
    adjacent: 1
  }
]

const passengers = [
  {
    name: 'B',
    age: 21,
    gender: 'F'
  }
]

test('selects consecutive seats', () => {
  expect(allocateSeats([1, 3, 4, 5, 7, 8, 9, 10], 4))
    .toStrictEqual([7, 8, 9, 10])
})

test('selects consecutive seats', () => {
  expect(allocateSeats([1, 3, 5, 7, 8], 3))
    .toStrictEqual([7, 8, 1])
})

test('selects consecutive seats', () => {
  expect(allocateSeats([1, 2, 3, 5, 6, 10], 5))
    .toStrictEqual([1, 2, 3, 5, 6])
})

test('selects a seat', () => {
  const bus = [
    {
      seatNumber: 1,
      bookedBy: null,
      adjacent: 2
    },
    {
      seatNumber: 2,
      bookedBy: null,
      adjacent: 1
    }
  ]
  expect(findSeat([1, 2], bus, 'F'))
    .toStrictEqual(1)
})
