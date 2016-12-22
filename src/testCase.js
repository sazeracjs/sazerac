import { isArray } from 'lodash'
import actions from './reducers/actions'

const newTestCase = (caseIndex) => {
  return {
    ___caseIndex: caseIndex,
    expect: testCaseFn(caseIndex, 'setCaseExpectedValue', 'expectedValue'),
    describe: testCaseFn(caseIndex, 'setCaseDescribeMessage', 'message'),
    should: testCaseFn(caseIndex, 'setCaseShouldMessage', 'message'),
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
