import { slice, isFunction } from 'lodash'
import convertCase from '../convertCase'
import store from './store'

let actions = {}
let actionTypes = {}
let state = {}
let listenerFns = []

const actionsArray = [
  'INIT',
  'ADD_CASE',
  'ADD_EXPECTED_VALUE',
  'SET_CASE_DESCRIBE_MESSAGE',
  'SET_CASE_SHOULD_MESSAGE'
]

actionsArray.forEach((action) => {
  actions[convertCase(action)] = (params) => {
    return doAction(action, params)
  }
  actionTypes[action] = action
})

const doAction = (type, params) => {
  state = store(state, { type, ...params })
  listenerFns.forEach((fn) => { fn(state) })
  return state
}

const listener = (fn) => {
  if (isFunction(fn)) {
    listenerFns.push(fn)
  } else {
    throw new Error('invalid listener. ' + fn + ' is not a function')
  }
}

export { actions, actionTypes, listener }
export default actions
