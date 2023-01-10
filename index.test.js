const { bookSeat, inputParser } = require('./index')

test('book seat (available)', () => {
    expect(bookSeat('1\nViny Selopal 24 F')).toBe('Seats alloted: S1')
})

test('parse input', () => {
    expect(inputParser('1\nViny 24 F')).toStrictEqual({total: 1, individuals: [{name: 'Viny', age: 24, gender: 'F'}]})
})