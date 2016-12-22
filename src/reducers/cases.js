import { concat, map, toArray } from 'lodash'
import { actionTypes } from './actions'
import { defaultDescribeCase, defaultShouldMessage } from '../messages'

const updateCase = (cases, caseIndex, fn) => {
  return map(cases, (tCase, i) => {
    if (caseIndex === i) {
      return fn(tCase)
    }
    return tCase
  })
}

const setCaseProps = (state, caseIndex, props) => {
  return updateCase(state, caseIndex, (tCase) => {
    return { ...tCase, ...props }
  })
}

export default (state = [], action) => {

  switch(action.type) {
    
    case actionTypes.ADD_CASE:
      const inputParams = toArray(action.args)
      return concat(state, {
        inputParams: inputParams,
        describeMessage: defaultDescribeCase(inputParams)
      })

    case actionTypes.SET_CASE_EXPECTED_VALUE:
      return setCaseProps(state, action.caseIndex, {
          expectedValue: action.expectedValue,
          shouldMessage: defaultShouldMessage(action.expectedValue)
      })

    case actionTypes.SET_CASE_DESCRIBE_MESSAGE:
      return setCaseProps(state, action.caseIndex, { describeMessage: action.message })

    case actionTypes.SET_CASE_SHOULD_MESSAGE:
      return setCaseProps(state, action.caseIndex, { shouldMessage: action.message })

    default:
      return state

  }

}