import objectArgsToArray from './objectArgsToArray'

const newTestCaseCollection = (testCases) => {

  testCases = objectArgsToArray(testCases)

  return {

    /**
     * Defines the expected return value for all test cases in
     * the collection. Calls expect() on each test case.
     *
     * @param {object} expectation - The expected return value
     * @param {string} message - A message to describe the test case expectation
     *
     * @returns {object} A test case collection object
     */
    expect: collectionFn(testCases, 'expect'),

    /**
     * Defines an expected error to be thrown for all test cases
     * in the collection. Calls expectError() on each test case.
     *
     * @param {object} expectation - The expected error message to be thrown
     * @param {string} message - A message to describe the test case expectation
     *
     * @returns {object} A test case collection object
     */
    expectError: collectionFn(testCases, 'expectError'),

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
    assert: collectionFn(testCases, 'assert'),

    /**
     * Adds a function to run before each test case in the collection.
     * Calls before() on each test case
     *
     * @param {function} beforeFn
     *
     * @returns {object} A test case collection object
     */
    before: collectionFn(testCases, 'before'),

    /**
     * Adds a function to run after each test case in the collection.
     * Calls after() on each test case
     *
     * @param {function} afterFn
     *
     * @returns {object} A test case collection object
     */
    after: collectionFn(testCases, 'after')
  }
}

const collectionFn = (testCases, fnName) => {
  return (...args) => {
    testCases.forEach((testCase) => {
      testCase[fnName].apply(null, args)
    })
    return newTestCaseCollection(testCases)
  }
}

export { newTestCaseCollection }
export default newTestCaseCollection
