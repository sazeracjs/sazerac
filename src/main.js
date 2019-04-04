import isFunction from 'lodash.isfunction'
import errors from './errors'
import lastCaseIndex from './lastCaseIndex'
import { actions, listener } from './reducers/actions'
import describer from './describer'
import { newTestCase } from './testCase'
import { newTestCaseCollection } from './testCaseCollection'

let _state

listener((state) => { _state = state })

/**
 * Defines test cases for a function
 *
 * @param {function} testFn - The function to test
 * @param {function} definerFn - The function that defines test cases for `testFn`
 */
const test = (testFn, definerFn) => {
  const frameworkFns = {
    describeFn: describe,
    itFn: it
  }
  if (!isFunction(testFn)) throw new Error(errors.expectedFunction('test', testFn))
  if (!isFunction(definerFn)) throw new Error(errors.expectedFunction('test', definerFn))
  actions.init({ testFn })
  definerFn()
  describer(_state, frameworkFns)
}

/**
 * Defines the functional arguments for a test case
 *
 * @param {...object} args - The arguments that will be passed to the function being
 *                           tested
 *
 * @returns {object} A test case object
 */
const given = (...args) => {
  const state = actions.addCase({ args })
  const caseIndex = lastCaseIndex(state)
  return newTestCase(caseIndex)
}

/**
 * Groups multiple test case objects into a collection
 *
 * @param {...object} testCases - The test case objects to group. Accepts an array or
 *                                a series of arguments
 *
 * @returns {object} A test case collection object
 */
const forCases = (...testCases) => {
  return newTestCaseCollection(testCases)
}

export { test, given, forCases }
export default { test, given, forCases }
