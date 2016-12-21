import actions from './actions'
import cases from './cases'
import describeMessage from './describeMessage'
import testFunction from './testFunction'

export default (state = {}, action) => {
  return {
    testFunction: testFunction(state.testFunction, action),
    cases: cases(state.cases, action),
    describeMessage: describeMessage(state.describeMessage, action)
  }
}