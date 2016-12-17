'use strict'

import { forEach, map } from 'lodash'
import { assert } from 'chai'

const describer = (context, frameworkFunctions) => {
  executeDescribers(buildDescriberDefinition(context, frameworkFunctions))
}

const executeDescribers = (def) => {
  const { func, message, calls, test } = def
  func(message, () => {
    test ? testExecuter.apply(null, test) : forEach(calls, (call) => { executeDescribers(call) })
  })
}

const testExecuter = (testFunction, inputParams, expectedValue) => {
  const actualVal = testFunction.apply(null, inputParams)
  assert.deepEqual(actualVal, expectedValue)
}

const buildDescriberDefinition = (context, frameworkFunctions) => {
  const { describeFn } = frameworkFunctions
  const { testFunction, cases, describeMessage } = context
  return {
    func: describeFn,
    message: describeMessage,
    calls: map(cases, (tCase) => {
      return getCaseDescriberDef(tCase, frameworkFunctions, testFunction)
    })
  }
}

const getCaseDescriberDef = (tCase, frameworkFunctions, testFunction) => {
  const { describeFn, itFn } = frameworkFunctions
  return {
    func: describeFn,
    message: tCase.describeMessage,
    calls: [getCaseShouldDef(tCase, itFn, testFunction)]
  }
}

const getCaseShouldDef = (tCase, itFn, testFunction) => {
  const { shouldMessage, inputParams, expectedValue } = tCase
  return {
    func: itFn,
    message: shouldMessage,
    test: [testFunction, inputParams, expectedValue]
  }
}

export default describer
export { describer, buildDescriberDefinition, testExecuter }
