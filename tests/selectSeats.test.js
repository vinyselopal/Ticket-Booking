const { selectSeats } = require('../services/selectSeats')

test('selects consecutive seats', () => {
  expect(selectSeats([1, 3, 4, 5, 7, 8, 9, 10], 4))
    .toStrictEqual([7, 8, 9, 10])
})
