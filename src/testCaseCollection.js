import { forEach } from 'lodash'
import objectArgsToArray from './objectArgsToArray'

const newTestCaseCollection = (testCases) => {

  testCases = objectArgsToArray(testCases)

  return {
    expect: collectionFn(testCases, 'expect'),
    describe: collectionFn(testCases, 'describe'),
    should: collectionFn(testCases, 'should'),
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
