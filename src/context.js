'use strict'

import {concat, map, find, isString, toArray} from 'lodash'

const init = (fn, describeMessage) => {
  return {
    testFunction: fn,
    cases: [],
    describeMessage: describeMessage || fn.name + '()'
  }
}

const addCase = (ctx, args) => {

  const argsArray = toArray(args)

  return {
    context: { 
      ...ctx,
      cases: concat(ctx.cases, {
        inputParams: argsArray,
        describeMessage: describeCase(argsArray)
      })
    },
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
        shouldMessage: shouldMessage(expectedValue)
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

const describeCase = (args = []) => {
  if (args.length > 0) {
    const formattedArgs = args.map((arg) => {
      return formatString(arg)
    })
    return 'when given ' + formattedArgs.join(' and ')
  } else {
    return 'when called'
  }
}

const shouldMessage = (expectedValue) => {
  return 'should return ' + formatString(expectedValue)
}

const formatString = (str) => {
  if (isString(str)) return "'" + str + "'"
  return str
}

export default {
  init,
  addCase,
  addExpectedValue,
  setDescribeMessage
}
