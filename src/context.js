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
    ...ctx,
    cases: concat(resetContext(ctx.cases), {
      inputParams: argsArray,
      contextActive: true,
      describeMessage: describeCase(argsArray)
    })
  }
}

const addExpectedValue = (ctx, expectedVal) => {
  return {
    ...ctx,
    cases: mapActiveCases(ctx.cases, (tCase) => {
      return {
        ...tCase,
        expectedValue: expectedVal,
        shouldMessage: shouldMessage(expectedVal)
      }
    })
  }
}

const setDescribeMessage = (ctx, applyToAll, message) => {
  const setMsgProp = (tCase) => {
    return { ...tCase, describeMessage: message }
  }
  const cases = applyToAll ?
    map(ctx.cases, setMsgProp) : mapActiveCases(ctx.cases, setMsgProp)
  return { ...ctx, cases }
}

const mapActiveCases = (cases, fn) => {
  return map(cases, (tCase) => {
    if (tCase.contextActive) return fn(tCase)
    return tCase
  })
}

const resetContext = (cases) => {
  return map(cases, (c) => {
    return {
      ...c,
      contextActive: false
    }
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
