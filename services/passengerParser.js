const passengerParser = (input) => {
  const [name, ageString, gender] = input.split(' ')
  const age = parseInt(ageString, 10)
  if (isNaN(age) || !['M', 'F', 'NBQ'].includes(gender)) {
    return null
  }
  return { name, age, gender }
}

module.exports = { passengerParser }
