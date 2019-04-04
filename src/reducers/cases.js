import concat from 'lodash.concat'
import toArray from 'lodash.toarray'
import at from 'lodash.at'
import { vsprintf } from 'sprintf-js'
import { actionTypes } from './actions'
import expectationTypes from '../expectationTypes'
import {
  defaultDescribeCase,
  defaultShouldMessage,
  defaultShouldThrowMessage
} from '../messages'

const updateCase = (cases, caseIndex, fn) => {
  return cases.map((tCase, i) => {
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
  let inputParams, args, expectation, msg
  const defaultMsgFns = {
    [expectationTypes.VALUE]: defaultShouldMessage,
    [expectationTypes.ERROR]: defaultShouldThrowMessage
  }

  switch(action.type) {

    case actionTypes.ADD_CASE:
      inputParams = toArray(action.args)
      return concat(state, {
        inputParams: inputParams,
        describeMessage: defaultDescribeCase(inputParams)
      })

    case actionTypes.SET_CASE_EXPECTATION:
      msg = action.message || getCaseProp(state, caseIndex, 'shouldMessage')
      return setCaseProps(state, caseIndex, {
        expectation: {
          [action.expectationType]: action.expectation
        },
        shouldMessage: msg ?
          vsprintf(msg, [action.expectation]) :
          defaultMsgFns[action.expectationType](action.expectation)
      })

    case actionTypes.SET_CASE_DESCRIBE_MESSAGE:
      args = getCaseProp(state, caseIndex, 'inputParams')
      msg = args && args.length > 0 ?
        vsprintf(action.message, args) : action.message
      return setCaseProps(state, caseIndex, { describeMessage: msg })

    case actionTypes.SET_CASE_SHOULD_MESSAGE:
      expectation = getCaseProp(state, caseIndex, 'expectation')
      msg = expectation !== undefined && expectationTypes.VALUE in expectation ?
        vsprintf(action.message, [expectation[expectationTypes.VALUE]]) : action.message
      return setCaseProps(state, caseIndex, { shouldMessage: msg })

    case actionTypes.INIT:
      return []

    default:
      return state

  }

}