import { concat, map, toArray } from 'lodash'
import Actions from './Actions'
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
    
    case Actions.ADD_CASE:
      const inputParams = toArray(action.args)
      return concat(state, {
        inputParams: inputParams,
        describeMessage: defaultDescribeCase(inputParams)
      })

    case Actions.ADD_EXPECTED_VALUE:
      return updateCase(state, action.caseIndex, (tCase) => {
        return {
          ...tCase,
          expectedValue: action.expectedValue,
          shouldMessage: defaultShouldMessage(action.expectedValue)
        }
      })

    default:
      return state

  }

}