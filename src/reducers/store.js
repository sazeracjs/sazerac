import cases from './cases'
import caseAssertions from './caseAssertions'
import describeMessage from './describeMessage'
import testFunction from './testFunction'

export default (state = {}, action) => {
  return {
    testFunction: testFunction(state.testFunction, action),
    cases: cases(state.cases, action),
    caseAssertions: caseAssertions(state.caseAssertions, action),
    describeMessage: describeMessage(state.describeMessage, action)
  }
}