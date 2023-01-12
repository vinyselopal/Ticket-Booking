const { allocateSeats } = require('../services/allocateSeats')

const unbookedSeatNumbers = [1, 3, 4, 5, 7, 8, 9, 10]
const totalPassengers = 4
test('selects consecutive seats', () => {
  expect(allocateSeats(unbookedSeatNumbers, totalPassengers))
    .toStrictEqual([7, 8, 9, 10])
})
