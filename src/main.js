'use strict'

import context from './context'
import describer from './describer'

const frameworkFns = {
  describeFn: describe,
  itFn: it
}

let _ctx;

const test = (testFn, definerFn) => {
  // TODO: throw if they're not functions
  _ctx = context.init(testFn)
  definerFn()
  describer(_ctx, frameworkFns)
}

const given = (...args) => {
  const { caseIndex, context: ctx } = context.addCase(_ctx, args)
  _ctx = ctx
  return newTestCase(caseIndex)
}

const newTestCase = (caseIndex) => {
  return {
    ___caseIndex: caseIndex,
    expect: getExpectFn(caseIndex)
  }
}

const getExpectFn = (caseIndex) => {
  return (expectedValue) => {
    _ctx = context.addExpectedValue(_ctx, caseIndex, expectedValue)
    return newTestCase(caseIndex)
  }
}

export { test, given }
export default { test, given }
