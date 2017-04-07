import isFunction from 'lodash.isfunction'
import convertCase from '../convertCase'
import store from './store'

let actions = {}
let actionTypes = {}
let state = {}
let listenerFns = []

const actionsArray = [
  'INIT',
  'ADD_CASE',
  'SET_CASE_EXPECTATION',
  'SET_CASE_DESCRIBE_MESSAGE',
  'SET_CASE_SHOULD_MESSAGE',
  'ADD_CASE_ASSERTION',
  'ADD_CASE_BEFORE_FN',
  'ADD_CASE_AFTER_FN'
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
