let Actions = {}

const actionsArray = [
  'INIT',
  'ADD_CASE',
  'ADD_EXPECTED_VALUE'
]

actionsArray.forEach((action) => {
  Actions[action] = action
})

const newAction = (type, params) => {
  return { type, ...params }
}

export { Actions, newAction }
export default Actions
