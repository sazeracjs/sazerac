import cases from './cases'
import caseAssertions from './caseAssertions'
import describeMessage from './describeMessage'
import testFunction from './testFunction'
import setupAndTeardown, { setupAndTeardownTypes } from './setupAndTeardown'

export default (state = {}, action) => {
  return {
    testFunction: testFunction(state.testFunction, action),
    cases: cases(state.cases, action),
    caseAssertions: caseAssertions(state.caseAssertions, action),
    beforeFunctions: setupAndTeardown(state.beforeFunctions, setupAndTeardownTypes.BEFORE, action),
    afterFunctions: setupAndTeardown(state.afterFunctions, setupAndTeardownTypes.AFTER, action),
    describeMessage: describeMessage(state.describeMessage, action)
  }
}