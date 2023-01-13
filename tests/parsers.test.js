const { passengerParser, paymentMethodParser, totalPassengersParser } = require('../services/parsers')

test('parses passenger details string', () => {
  expect(passengerParser('A 20 F'))
    .toStrictEqual({
      name: 'A',
      age: 20,
      gender: 'F'
    })
})

test('parses passenger details string', () => {
  expect(passengerParser('A20F'))
    .toStrictEqual(null)
})

test('parses passenger details string', () => {
  expect(passengerParser('A 20f NBQ'))
    .toStrictEqual(null)
})

test('parses passenger details string', () => {
  expect(passengerParser('A 20 P'))
    .toStrictEqual(null)
})

test('parses totalPassenger string', () => {
  expect(totalPassengersParser('1d'))
    .toStrictEqual(null)
})

test('parses paymentMethod string', () => {
  expect(paymentMethodParser('upi'))
    .toStrictEqual(null)
})

test('parses paymentMethod string', () => {
  expect(paymentMethodParser('card'))
    .toStrictEqual('card')
})
