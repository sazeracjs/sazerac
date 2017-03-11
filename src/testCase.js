import isArray from 'lodash/isArray'
import actions from './reducers/actions'

/** Creates a new test case object */
const newTestCase = (caseIndex) => {
  return {
    ___caseIndex: caseIndex,

    /**
     * Defines the expected return value for this test case. 
     * Uses http://chaijs.com, assert.deepEqual() to assert
     * that the expected return value equals the actual
     * return value.
     * 
     * @param {object} expectedValue - The expected return value
     * @param {string} message - A message to describe the test case expectation
     *
     * @returns {object} A test case object
     */
    expect: testCaseFn(caseIndex, 'setCaseExpectedValue', ['expectedValue', 'message']),

    /**
     * Defines the "describe" message for this test case.
     * 
     * @param {string} message
     *
     * @returns {object} A test case object
     */
    describe: testCaseFn(caseIndex, 'setCaseDescribeMessage', 'message'),

    /**
     * Defines the "should" message for this test case. This is
     * passed to the `it` function when executing the test.
     * 
     * @param {string} message
     *
     * @returns {object} A test case object
     */
    should: testCaseFn(caseIndex, 'setCaseShouldMessage', 'message'),

    /**
     * Defines a custom assertion function for this test case
     * 
     * @param {string} message - A message describing the assertion
     * @param {function} assertFn - The custom assert function. Receives
     *                              the actual return value of the function
     *                              being tested as its only argument
     *
     * @returns {object} A test case object
     */
    assert: testCaseFn(caseIndex, 'addCaseAssertion', ['message', 'assertFn'])
  }
}

const testCaseFn = (caseIndex, action, paramNames) => {
  paramNames = isArray(paramNames) ? paramNames : [paramNames]
  return (...params) => {
    let actionArgs = { caseIndex }
    paramNames.forEach((n, i) => {
      actionArgs[n] = params[i]
    })
    actions[action](actionArgs)
    return newTestCase(caseIndex)
  }
}

export { newTestCase }
export default newTestCase
