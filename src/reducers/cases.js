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

export default (state = [], action) => {

  switch(action.type) {
    
    case actionTypes.ADD_CASE:
      const inputParams = toArray(action.args)
      return concat(state, {
        inputParams: inputParams,
        describeMessage: defaultDescribeCase(inputParams)
      })

    case actionTypes.ADD_EXPECTED_VALUE:
      return updateCase(state, action.caseIndex, (tCase) => {
        return {
          ...tCase,
          expectedValue: action.expectedValue,
          shouldMessage: defaultShouldMessage(action.expectedValue)
        }
      })

    case actionTypes.SET_CASE_DESCRIBE_MESSAGE:
      return updateCase(state, action.caseIndex, (tCase) => {
        return {
          ...tCase,
          describeMessage: action.message
        }
      })

    default:
      return state

  }

}