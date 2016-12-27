import { concat, map, toArray, at } from 'lodash'
import { vsprintf } from 'sprintf-js'
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

const getCaseProp = (state, caseIndex, prop) => {
  return at(state, '[' + caseIndex + '].' + prop)[0]
}

export default (state = [], action) => {

  const { caseIndex } = action

  switch(action.type) {
    
    case actionTypes.ADD_CASE:
      const inputParams = toArray(action.args)
      return concat(state, {
        inputParams: inputParams,
        describeMessage: defaultDescribeCase(inputParams)
      })

    case actionTypes.SET_CASE_EXPECTED_VALUE:
      const shouldMsg = getCaseProp(state, caseIndex, 'shouldMessage')
      return setCaseProps(state, caseIndex, {
          expectedValue: action.expectedValue,
          shouldMessage: shouldMsg ? shouldMsg : defaultShouldMessage(action.expectedValue)
      })

    case actionTypes.SET_CASE_DESCRIBE_MESSAGE:
      const args = getCaseProp(state, caseIndex, 'inputParams')
      const msg = args && args.length > 0 ? vsprintf(action.message, args) : action.message
      return setCaseProps(state, caseIndex, { describeMessage: msg })

    case actionTypes.SET_CASE_SHOULD_MESSAGE:
      return setCaseProps(state, caseIndex, { shouldMessage: action.message })

    case actionTypes.INIT:
      return []

    default:
      return state

  }

}