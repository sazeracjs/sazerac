import filter from 'lodash.filter'
import isUndefined from 'lodash.isundefined'
import deepEqual from './deepEqual'
import expectationTypes from './expectationTypes'

export const describer = (context, frameworkFunctions) => {
  executeDescribers(buildDescriberDefinition(context, frameworkFunctions))
}

export const executeDescribers = (def) => {
  const { func, message, calls, test } = def

  func(message, () => {
    if (test) {
      const { testFn, inputParams, expectation, assertFn, beforeFns, afterFns } = test

      executeFns(beforeFns)

      if (test.hasOwnProperty('expectation')) {
        if (expectation.hasOwnProperty(expectationTypes.VALUE)) {
          testExecuter(testFn, inputParams, expectation[expectationTypes.VALUE])
        } else if (expectation.hasOwnProperty(expectationTypes.ERROR)) {
          errorTestExecuter(testFn, inputParams, expectation[expectationTypes.ERROR])
        }
      } else if (assertFn) {
        assertionExecuter(testFn, inputParams, assertFn)
      }

      executeFns(afterFns)

    } else {
      calls.forEach((call) => { executeDescribers(call) })
    }
  })
}

export const testExecuter = (testFn, inputParams, expectedVal) => {
  const actualVal = testFn.apply(null, inputParams)
  deepEqual(actualVal, expectedVal)
}

export const errorTestExecuter = (testFn, inputParams, expectedError) => {
  let actualErrMsg
  let expectedErrMsg = expectedError
  try {
    testFn.apply(null, inputParams)
  } catch (err) {
    actualErrMsg = err.message
  }
  deepEqual(actualErrMsg, expectedErrMsg)
}

export const assertionExecuter = (testFn, inputParams, assertFn) => {
  const actualVal = testFn.apply(null, inputParams)
  assertFn(actualVal)
}

export const buildDescriberDefinition = (context, frameworkFunctions) => {
  const { describeFn } = frameworkFunctions
  const { describeMessage } = context
  return {
    func: describeFn,
    message: describeMessage,
    calls: getCaseDescriberCalls(context, frameworkFunctions)
  }
}

const executeFns = (fns = []) => {
  fns.forEach((fn) => {
    fn()
  })
}

const getCaseDescriberCalls = (context, frameworkFunctions) => {
  const { testFunction, cases, caseAssertions, beforeFunctions, afterFunctions } = context
  return cases.map((tCase, caseIndex) => {
    const assertions = filter(caseAssertions, ['caseIndex', caseIndex])
    const beforeFns = filter(beforeFunctions, ['caseIndex', caseIndex]).map(fnDef => fnDef.beforeFn) || []
    const afterFns = filter(afterFunctions, ['caseIndex', caseIndex]).map(fnDef => fnDef.afterFn) || []
    return getCaseDescriberDef(tCase, frameworkFunctions, testFunction, assertions, beforeFns, afterFns)
  })
}

const getCaseDescriberDef = (tCase, frameworkFunctions, testFn, assertions, beforeFns, afterFns) => {
  const { describeFn, itFn } = frameworkFunctions
  return {
    func: describeFn,
    message: tCase.describeMessage,
    calls: getCaseItCalls(tCase, itFn, testFn, assertions, beforeFns, afterFns)
  }
}

const getCaseItCalls = (tCase, itFn, testFn, assertions, beforeFns, afterFns) => {
  const { shouldMessage, inputParams, expectation } = tCase
  let calls = []
  if (!isUndefined(expectation)) {
    calls.push({
      func: itFn,
      message: shouldMessage,
      test: { testFn, inputParams, expectation, beforeFns, afterFns }
    })
  }
  if (assertions) {
    assertions.forEach((assertion) => {
      const { assertFn } = assertion
      calls.push({
        func: itFn,
        message: assertion.shouldMessage,
        test: { testFn, inputParams, assertFn, beforeFns, afterFns }
      })
    })
  }
  return calls
}

export default describer
