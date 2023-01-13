const { allocateSeats, allocateSeat, getAvailableSeats } = require('../services/allocateSeats')

test('get available seats', () => {
  const bus = [
    {
      seatNumber: 1,
      bookedBy: {
        name: 'A',
        age: 12,
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
      bookedBy: {
        name: 'B',
        age: 40,
        gender: 'M'
      },
      adjacent: 4
    },
    {
      seatNumber: 4,
      bookedBy: null,
      adjacent: 3

    }
  ]
  expect(getAvailableSeats(bus))
    .toStrictEqual([2, 4])
})
test('selects consecutive seats (largest segment greater than passengers)', () => {
  const bus = [
    {
      seatNumber: 1,
      bookedBy: {
        name: 'B',
        age: 40,
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
      bookedBy: {
        name: 'B',
        age: 40,
        gender: 'M'
      },
      adjacent: 4
    },
    {
      seatNumber: 4,
      bookedBy: {
        name: 'B',
        age: 40,
        gender: 'M'
      },
      adjacent: 3
    },
    {
      seatNumber: 5,
      bookedBy: {
        name: 'B',
        age: 40,
        gender: 'M'
      },
      adjacent: 6
    },
    {
      seatNumber: 6,
      bookedBy: null,
      adjacent: 5
    },
    {
      seatNumber: 7,
      bookedBy: {
        name: 'B',
        age: 40,
        gender: 'M'
      },
      adjacent: 8
    },
    {
      seatNumber: 8,
      bookedBy: {
        name: 'B',
        age: 40,
        gender: 'M'
      },
      adjacent: 7
    },
    {
      seatNumber: 9,
      bookedBy: {
        name: 'B',
        age: 40,
        gender: 'M'
      },
      adjacent: 10
    },
    {
      seatNumber: 10,
      bookedBy: {
        name: 'B',
        age: 40,
        gender: 'M'
      },
      adjacent: 9
    },
    {
      seatNumber: 11,
      bookedBy: null,
      adjacent: 12
    },
    {
      seatNumber: 12,
      bookedBy: null,
      adjacent: 11
    }
  ]
  const passangers = [
    {
      name: 'E',
      age: 40,
      gender: 'M'
    },
    {
      name: 'F',
      age: 40,
      gender: 'F'
    },
    {
      name: 'G',
      age: 40,
      gender: 'M'
    },
    {
      name: 'H',
      age: 40,
      gender: 'M'
    }
  ]
  expect(allocateSeats(bus, passangers))
    .toStrictEqual({ shouldConfirmSeat: false, allocatedSeats: [11, 12, 2, 6] })
})

test('selects consecutive seats (largest segment smaller than passengers)', () => {
  const bus = [
    {
      seatNumber: 1,
      bookedBy: null,
      adjacent: 2
    },
    {
      seatNumber: 2,
      bookedBy: {
        name: 'B',
        age: 40,
        gender: 'M'
      },
      adjacent: 1
    },
    {
      seatNumber: 3,
      bookedBy: null,
      adjacent: 4
    },
    {
      seatNumber: 4,
      bookedBy: {
        name: 'B',
        age: 40,
        gender: 'M'
      },
      adjacent: 3
    },
    {
      seatNumber: 5,
      bookedBy: null,
      adjacent: 6
    },
    {
      seatNumber: 6,
      bookedBy: {
        name: 'B',
        age: 40,
        gender: 'M'
      },
      adjacent: 5
    },
    {
      seatNumber: 7,
      bookedBy: null,
      adjacent: 8
    },
    {
      seatNumber: 8,
      bookedBy: null,
      adjacent: 7
    },
    {
      seatNumber: 9,
      bookedBy: {
        name: 'B',
        age: 40,
        gender: 'M'
      },
      adjacent: 10
    },
    {
      seatNumber: 10,
      bookedBy: {
        name: 'B',
        age: 40,
        gender: 'M'
      },
      adjacent: 9
    },
    {
      seatNumber: 11,
      bookedBy: {
        name: 'B',
        age: 40,
        gender: 'M'
      },
      adjacent: 12
    },
    {
      seatNumber: 12,
      bookedBy: {
        name: 'B',
        age: 40,
        gender: 'M'
      },
      adjacent: 11
    }
  ]
  const passangers = [
    {
      name: 'E',
      age: 40,
      gender: 'M'
    },
    {
      name: 'F',
      age: 40,
      gender: 'F'
    },
    {
      name: 'G',
      age: 40,
      gender: 'M'
    }
  ]
  expect(allocateSeats(bus, passangers))
    .toStrictEqual({ shouldConfirmSeat: false, allocatedSeats: [7, 8, 1] })
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
    .toStrictEqual({ shouldConfirmSeat: false, allocatedSeats: [1] })
})

test('selects seat (first available seat which is not besides opposite gender)', () => {
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
    .toStrictEqual({ shouldConfirmSeat: false, allocatedSeats: [3] })
})

test('selects seat (first available seat besides same gender)', () => {
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
      bookedBy: {
        name: 'A',
        age: 21,
        gender: 'F'
      },
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
    .toStrictEqual({ shouldConfirmSeat: false, allocatedSeats: [3] })
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
    .toStrictEqual({ shouldConfirmSeat: false, allocatedSeats: [2] })
})

test('no available seats', () => {
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
    },
    {
      seatNumber: 3,
      bookedBy: null,
      adjacent: 4
    },
    {
      seatNumber: 4,
      bookedBy: {
        name: 'B',
        age: 40,
        gender: 'M'
      },
      adjacent: 3
    },
    {
      seatNumber: 5,
      bookedBy: null,
      adjacent: 6
    },
    {
      seatNumber: 6,
      bookedBy: null,
      adjacent: 5
    },
    {
      seatNumber: 7,
      bookedBy: {
        name: 'B',
        age: 40,
        gender: 'M'
      },
      adjacent: 8
    },
    {
      seatNumber: 8,
      bookedBy: {
        name: 'B',
        age: 40,
        gender: 'M'
      },
      adjacent: 7
    },
    {
      seatNumber: 9,
      bookedBy: {
        name: 'B',
        age: 40,
        gender: 'M'
      },
      adjacent: 10
    },
    {
      seatNumber: 10,
      bookedBy: null,
      adjacent: 9
    },
    {
      seatNumber: 11,
      bookedBy: {
        name: 'B',
        age: 40,
        gender: 'M'
      },
      adjacent: 12
    },
    {
      seatNumber: 12,
      bookedBy: {
        name: 'B',
        age: 40,
        gender: 'M'
      },
      adjacent: 11
    }
  ]
  const passangers = [
    {
      name: 'E',
      age: 40,
      gender: 'M'
    },
    {
      name: 'F',
      age: 40,
      gender: 'F'
    },
    {
      name: 'G',
      age: 40,
      gender: 'M'
    },
    {
      name: 'H',
      age: 40,
      gender: 'M'
    }, {
      name: 'E',
      age: 40,
      gender: 'M'
    },
    {
      name: 'F',
      age: 40,
      gender: 'F'
    },
    {
      name: 'G',
      age: 40,
      gender: 'M'
    },
    {
      name: 'H',
      age: 40,
      gender: 'M'
    }
  ]
  expect(allocateSeats(bus, passangers))
    .toStrictEqual({ shouldConfirmSeat: false, allocatedSeats: [] })
})

test('no available seat', () => {
  expect(allocateSeat([], 1))
    .toStrictEqual({ shouldConfirmSeat: false, allocatedSeats: [] })
})
