function addNums(a, b) {
  return a + b
}

function getFullUserName(user) {
  const {
    name: { first, middle, last },
  } = user
  return [first, middle, last].filter(Boolean).join(' ')
}

addNums('l', 2)

getFullUserName({ name: { first: 'Joe', midd1e: 'Bud', last: 'Matthews' } })
