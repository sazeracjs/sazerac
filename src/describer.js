import forEach from 'lodash/forEach'
import map from 'lodash/map'
import filter from 'lodash/filter'
import isUndefined from 'lodash/isUndefined'
import deepEqual from './deepEqual'

const describer = (context, frameworkFunctions) => {
  executeDescribers(buildDescriberDefinition(context, frameworkFunctions))
}

const executeDescribers = (def) => {
  const { func, message, calls, test } = def

  func(message, () => {
    if (test) {
      const { testFn, inputParams, expectedValue, assertFn } = test
      if (test.hasOwnProperty('expectedValue')) {
        testExecuter(testFn, inputParams, expectedValue)
      } else if (assertFn) {
        assertionExecuter(testFn, inputParams, assertFn)
      }
    } else {
      forEach(calls, (call) => { executeDescribers(call) })
    }
  })
}

const testExecuter = (testFn, inputParams, expectedValue) => {
  const actualVal = testFn.apply(null, inputParams)
  deepEqual(actualVal, expectedValue)
}

const assertionExecuter = (testFn, inputParams, assertFn) => {
  const actualVal = testFn.apply(null, inputParams)
  assertFn(actualVal)
}

const buildDescriberDefinition = (context, frameworkFunctions) => {
  const { describeFn } = frameworkFunctions
  const { describeMessage } = context
  return {
    func: describeFn,
    message: describeMessage,
    calls: getCaseDescriberCalls(context, frameworkFunctions)
  }
}

const getCaseDescriberCalls = (context, frameworkFunctions) => {
  const { testFunction, cases, caseAssertions } = context
  return map(cases, (tCase, caseIndex) => {
    const assertions = filter(caseAssertions, ['caseIndex', caseIndex])
    return getCaseDescriberDef(tCase, frameworkFunctions, testFunction, assertions)
  })
}

const getCaseDescriberDef = (tCase, frameworkFunctions, testFn, assertions) => {
  const { describeFn, itFn } = frameworkFunctions
  return {
    func: describeFn,
    message: tCase.describeMessage,
    calls: getCaseItCalls(tCase, itFn, testFn, assertions)
  }
}

const getCaseItCalls = (tCase, itFn, testFn, assertions) => {
  const { shouldMessage, inputParams, expectedValue } = tCase
  let calls = []
  if (!isUndefined(expectedValue)) {
    calls.push({
      func: itFn,
      message: shouldMessage,
      test: { testFn, inputParams, expectedValue }
    })
  }
  if (assertions) {
    assertions.forEach((assertion) => {
      const { assertFn } = assertion
      calls.push({
        func: itFn,
        message: assertion.shouldMessage,
        test: { testFn, inputParams, assertFn }
      })
    })
  }
  return calls
}

export default describer
export { describer, buildDescriberDefinition, testExecuter, assertionExecuter, executeDescribers }
