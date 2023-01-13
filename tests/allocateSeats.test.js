const { allocateSeats, allocateSeat } = require('../services/allocateSeats')

test('selects consecutive seats (largest segment greater than passengers)', () => {
  expect(allocateSeats([1, 3, 4, 5, 7, 8, 9, 10], 4))
    .toStrictEqual([7, 8, 9, 10])
})

test('selects consecutive seats (largest segment smaller than passengers)', () => {
  expect(allocateSeats([1, 3, 5, 7, 8], 3))
    .toStrictEqual([7, 8, 1])
})

test('selects seat (first available)', () => {
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

  const passengers = [
    {
      name: 'B',
      age: 21,
      gender: 'F'
    }
  ]
  expect(allocateSeat([1, 2, 3, 5, 6, 10], bus, passengers))
    .toStrictEqual([1])
})

test('selects seat (first available opp. same gender)', () => {
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
    },
    {
      seatNumber: 3,
      bookedBy: null,
      adjacent: 4
    },
    {
      seatNumber: 4,
      bookedBy: null,
      adjacent: 3
    }
  ]

  const passengers = [
    {
      name: 'B',
      age: 21,
      gender: 'F'
    }
  ]
  expect(allocateSeat([2, 3], bus, passengers))
    .toStrictEqual([3])
})

test('selects seat (unavailable opp. same gender)', () => {
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
  expect(allocateSeat([2], bus, passengers))
    .toStrictEqual([2])
})

test('no available seats', () => {
  expect(allocateSeats([1, 2, 3, 5, 6, 10], 8))
    .toStrictEqual([])
})

test('no available seat', () => {
  expect(allocateSeat([], 1))
    .toStrictEqual([])
})
