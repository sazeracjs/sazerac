import { slice } from 'lodash'
import state from './state'

let Actions = {}

const actionsArray = [
  'INIT',
  'ADD_CASE',
  'ADD_EXPECTED_VALUE'
]

actionsArray.forEach((action) => {
  Actions[action] = action
})

const doAction = (type, context, params) => {
  return state(context, { type, ...params })
}

export { Actions, doAction }
export default Actions
