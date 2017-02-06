import concat from 'lodash/concat'
import map from 'lodash/map'
import toArray from 'lodash/toArray'
import at from 'lodash/at'
import isUndefined from 'lodash/isUndefined'
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
  let inputParams, args, expectedVal, msg

  switch(action.type) {
    
    case actionTypes.ADD_CASE:
      inputParams = toArray(action.args)
      return concat(state, {
        inputParams: inputParams,
        describeMessage: defaultDescribeCase(inputParams)
      })

    case actionTypes.SET_CASE_EXPECTED_VALUE:
      msg = action.message || getCaseProp(state, caseIndex, 'shouldMessage')
      return setCaseProps(state, caseIndex, {
        expectedValue: action.expectedValue,
        shouldMessage: msg ? 
          vsprintf(msg, [action.expectedValue]) :
            defaultShouldMessage(action.expectedValue)
      })

    case actionTypes.SET_CASE_DESCRIBE_MESSAGE:
      args = getCaseProp(state, caseIndex, 'inputParams')
      msg = args && args.length > 0 ? 
              vsprintf(action.message, args) : action.message
      return setCaseProps(state, caseIndex, { describeMessage: msg })

    case actionTypes.SET_CASE_SHOULD_MESSAGE:
      expectedVal = getCaseProp(state, caseIndex, 'expectedValue')
      msg = !isUndefined(expectedVal) ?
                    vsprintf(action.message, [expectedVal]) : action.message
      return setCaseProps(state, caseIndex, { shouldMessage: msg })

    case actionTypes.INIT:
      return []

    default:
      return state

  }

}