import filter from 'lodash.filter'
import isUndefined from 'lodash.isundefined'
import deepEqual from './deepEqual'

const describer = (context, frameworkFunctions) => {
  executeDescribers(buildDescriberDefinition(context, frameworkFunctions))
}

const executeDescribers = (def) => {
  const { func, message, calls, test } = def

  func(message, () => {
    if (test) {
      const { testFn, inputParams, expectedValue, assertFn, beforeFns, afterFns } = test

      executeFns(beforeFns)

      if (test.hasOwnProperty('expectedValue')) {
        testExecuter(testFn, inputParams, expectedValue)
      } else if (assertFn) {
        assertionExecuter(testFn, inputParams, assertFn)
      }

      executeFns(afterFns)

    } else {
      calls.forEach((call) => { executeDescribers(call) })
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

const executeFns = (fns = []) => {
  //console.log("CALLEM: ", fns)
  fns.forEach((fn) => {
    //console.log("EXECUTING: ", fn)
    fn()
  })
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
  const { shouldMessage, inputParams, expectedValue } = tCase
  let calls = []
  if (!isUndefined(expectedValue)) {
    calls.push({
      func: itFn,
      message: shouldMessage,
      test: { testFn, inputParams, expectedValue, beforeFns, afterFns }
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
export { describer, buildDescriberDefinition, testExecuter, assertionExecuter, executeDescribers }
