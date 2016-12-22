import actions from './reducers/actions'

const newTestCase = (caseIndex) => {
  return {
    ___caseIndex: caseIndex,
    expect: getExpectFn(caseIndex),
    describe: getDescribeFn(caseIndex)
  }
}

const getExpectFn = (caseIndex) => {
  return (expectedValue) => {
    actions.addExpectedValue({ caseIndex, expectedValue })
    return newTestCase(caseIndex)
  }
}

const getDescribeFn = (caseIndex) => {
  return (message) => {
    actions.setCaseDescribeMessage({ caseIndex, message })
    return newTestCase(caseIndex)
  }
}

export { newTestCase }
export default newTestCase
