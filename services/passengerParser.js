const passengerParser = (input) => {
  const [name, ageString, gender] = input.split(' ')
  return { name, age: parseInt(ageString, 10), gender }
}

module.exports = { passengerParser }
