import { slice } from 'lodash'
import state from './state'

let actions = {}

const actionsArray = [
  'INIT',
  'ADD_CASE',
  'ADD_EXPECTED_VALUE'
]

actionsArray.forEach((action) => {
  actions[action] = action
})

const doAction = (type, context, params) => {
  return state(context, { type, ...params })
}

export { actions, doAction }
export default actions
