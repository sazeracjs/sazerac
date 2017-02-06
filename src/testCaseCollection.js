import forEach from 'lodash/forEach'
import objectArgsToArray from './objectArgsToArray'

const newTestCaseCollection = (testCases) => {

  testCases = objectArgsToArray(testCases)

  return {

    /**
     * Defines the expected return value for all test cases in
     * the collection. Calls expect() on each test case.
     * 
     * @param {object} expectedValue - The expected return value
     *
     * @returns {object} A test case collection object
     */
    expect: collectionFn(testCases, 'expect'),

    /**
     * Defines the "describe" message for all test cases in the
     * collection. Calls describe() on each test case.
     * 
     * @param {string} message
     *
     * @returns {object} A test case collection object
     */
    describe: collectionFn(testCases, 'describe'),

    /**
     * Defines the "should" message for all test cases in the
     * collection. Calls should() on each test case.
     * 
     * @param {string} message
     *
     * @returns {object} A test case collection object
     */
    should: collectionFn(testCases, 'should'),

    /**
     * Defines a custom assertion function for all test cases in
     * the collection. Calls assert() on each test case.
     * 
     * @param {string} message - A message describing the assertion
     * @param {function} assertFn - The custom assert function
     *
     * @returns {object} A test case collection object
     */
    assert: collectionFn(testCases, 'assert')
  }
}

const collectionFn = (testCases, fnName) => {
  return (...args) => {
    forEach(testCases, (testCase) => {
      testCase[fnName].apply(null, args)
    })
    return newTestCaseCollection(testCases)
  }
}

export { newTestCaseCollection }
export default newTestCaseCollection
