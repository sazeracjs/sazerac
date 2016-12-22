import actions from './reducers/actions'

const newTestCase = (caseIndex) => {
  return {
    ___caseIndex: caseIndex,
    expect: testCaseFn(caseIndex, 'setCaseExpectedValue', 'expectedValue'),
    describe: testCaseFn(caseIndex, 'setCaseDescribeMessage', 'message'),
    should: testCaseFn(caseIndex, 'setCaseShouldMessage', 'message')
  }
}

const testCaseFn = (caseIndex, action, paramName) => {
  return (param) => {
    let actionArgs = { caseIndex }
    actionArgs[paramName] = param
    actions[action](actionArgs)
    return newTestCase(caseIndex)
  }
}

export { newTestCase }
export default newTestCase
