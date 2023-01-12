const { allocateSeats } = require('../services/allocateSeats')

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
