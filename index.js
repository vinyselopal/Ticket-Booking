const seats = [
    {
        seatNumber: 1,
        bookedBy: null
    },
    {
        seatNumber: 2,
        bookedBy: null
    },
    {
        seatNumber: 3,
        bookedBy: null
    },
    {
        seatNumber: 4,
        bookedBy: null
    }
]
const inputParser = (input) => {
    const [totalString, ...individualsStrings] = input.split('\n')
    
    parsedIndividuals = individualsStrings.map(individual => {
        const [name, ageString, gender] = individual.split(' ')
        return {name, age: parseInt(ageString, 10), gender}
    })
    return {total: parseInt(totalString, 10), individuals: parsedIndividuals}
}

const bookSeat = (input) => {
    const passengers = inputParser(input)
}

module.exports = {
    bookSeat,
    inputParser
}