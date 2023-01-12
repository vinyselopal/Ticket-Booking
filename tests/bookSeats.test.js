const { bookSeats } = require('../services/bookSeats')
const bus = [
  {
    seatNumber: 1,
    bookedBy: null
  },
  {
    seatNumber: 2,
    bookedBy: null
  }]

const allocatedSeats = [1, 2]
const passengers = [{
  name: 'A',
  age: 21,
  gender: 'F'
}]

test('mutates bus data', () => {
  expect(bookSeats(bus, allocatedSeats, passengers))
    .toStrictEqual([
      {
        seatNumber: 1,
        bookedBy: passengers[0]
      },
      {
        seatNumber: 2,
        bookedBy: null
      }
    ])
})
