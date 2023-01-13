const {
  main,
  createOutputString,
  checkCopassenger
} = require('../main')

test('return output string for user', async () => {
  const input = {
    totalPassengers: 1,
    passengers: [
      {
        name: 'A',
        age: 21,
        gender: 'F'
      }],
    paymentMethod: 'card'
  }
  expect(await main(input))
    .toBe('Total Amount: 518\nSeats alloted: S1')
})

test('return output string for user', async () => {
  const input = {
    totalPassengers: 2,
    passengers: [
      {
        name: 'A',
        age: 12,
        gender: 'M'
      },
      {
        name: 'B',
        age: 40,
        gender: 'M'
      }],
    paymentMethod: 'net-banking'
  }
  expect(await main(input))
    .toBe('Total Amount: 1030\nSeats alloted: S2 S3')
})

test('create output string', () => {
  expect(createOutputString(1030, [1, 2]))
    .toBe('Total Amount: 1030\nSeats alloted: S1 S2')
})

test('returns whether copassenger is same gender', () => {
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
  expect(checkCopassenger(bus, 2, 'F'))
    .toBe(false)
})
