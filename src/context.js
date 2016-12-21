'use strict'

import { map } from 'lodash'
import { Actions, newAction } from './reducers/Actions'
import { defaultDescribeCase, defaultShouldMessage } from './messages'
import state from './reducers/state'

const init = (fn, describeMessage) => {
  return state({}, newAction(Actions.INIT, { fn, describeMessage }));
}

const addCase = (ctx, args) => {
  return {
    context: state(ctx, newAction(Actions.ADD_CASE, { args })),
    caseIndex: nextCaseIndex(ctx)
  }
}

const addExpectedValue = (ctx, caseIndex, expectedValue) => {
  return {
    ...ctx,
    cases: updateCase(ctx.cases, caseIndex, (tCase) => {
      return {
        ...tCase,
        expectedValue,
        shouldMessage: defaultShouldMessage(expectedValue)
      }
    })
  }
}

const nextCaseIndex = (ctx) => {
  return ctx.cases.length;
}

const setDescribeMessage = (ctx, applyToAll, message) => {
  const setMsgProp = (tCase) => {
    return { ...tCase, describeMessage: message }
  }
  const cases = applyToAll ?
    map(ctx.cases, setMsgProp) : mapActiveCases(ctx.cases, setMsgProp)
  return { ...ctx, cases }
}

const updateCase = (cases, caseIndex, fn) => {
  return map(cases, (tCase, i) => {
    if (caseIndex === i) return fn(tCase)
    return tCase
  })
}

const mapActiveCases = (cases, fn) => {
  return map(cases, (tCase) => {
    if (tCase.contextActive) return fn(tCase)
    return tCase
  })
}

export default {
  init,
  addCase,
  addExpectedValue,
  setDescribeMessage
}
