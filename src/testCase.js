import actions from './reducers/actions'
import expectationTypes from './expectationTypes'

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
     * @param {object} expectation - The expected return value
     * @param {string} message - A message to describe the test case expectation
     *
     * @returns {object} A test case object
     */
    expect: testCaseFn(
      { caseIndex, expectationType: expectationTypes.VALUE },
      'setCaseExpectation',
      ['expectation', 'message']
    ),

    /**
     * Defines an expected error to be thrown when this test case is executed.
     *
     * @param {object} expectation - The expected message from the error thrown
     * @param {string} message - A message to describe the test case expectation
     *
     * @returns {object} A test case object
     */
    expectError: testCaseFn(
      { caseIndex, expectationType: expectationTypes.ERROR },
      'setCaseExpectation',
      ['expectation', 'message']
    ),

    /**
     * Defines the "describe" message for this test case.
     *
     * @param {string} message
     *
     * @returns {object} A test case object
     */
    describe: testCaseFn({ caseIndex }, 'setCaseDescribeMessage', 'message'),

    /**
     * Defines the "should" message for this test case. This is
     * passed to the `it` function when executing the test.
     *
     * @param {string} message
     *
     * @returns {object} A test case object
     */
    should: testCaseFn({ caseIndex }, 'setCaseShouldMessage', 'message'),

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
    assert: testCaseFn({ caseIndex }, 'addCaseAssertion', ['message', 'assertFn']),

    /**
     * Adds a function to run before test case is executed
     *
     * @param {function} beforeFn
     *
     * @returns {object} A test case object
     */
    before: testCaseFn({ caseIndex }, 'addCaseBeforeFn', 'beforeFn'),

    /**
     * Adds a function to run after test case is executed
     *
     * @param {function} afterFn
     *
     * @returns {object} A test case object
     */
    after: testCaseFn({ caseIndex }, 'addCaseAfterFn', 'afterFn')
  }
}

// Not sure what `args` is for here, though the lint warning seems correct.
// eslint-disable-next-line no-unused-vars
const testCaseFn = (actionArgs, action, paramNames, args = []) => {
  paramNames = Array.isArray(paramNames) ? paramNames : [paramNames]
  const { caseIndex } = actionArgs
  return (...params) => {
    paramNames.forEach((n, i) => {
      actionArgs[n] = params[i]
    })
    actions[action](actionArgs)
    return newTestCase(caseIndex)
  }
}

export { newTestCase }
export default newTestCase
