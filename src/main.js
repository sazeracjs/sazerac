'use strict'

import { lastCaseIndex } from './context'
import { Actions, doAction } from './reducers/Actions'
import describer from './describer'

const frameworkFns = {
  describeFn: describe,
  itFn: it
}

let _ctx;

const test = (testFn, definerFn) => {
  // TODO: throw if they're not functions
  _ctx = doAction(Actions.INIT, undefined, { testFn })
  definerFn()
  describer(_ctx, frameworkFns)
}

const given = (...args) => {
  _ctx = doAction(Actions.ADD_CASE, _ctx, { args })
  const caseIndex = lastCaseIndex(_ctx)
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
    _ctx = doAction(Actions.ADD_EXPECTED_VALUE, _ctx, { caseIndex, expectedValue })
    return newTestCase(caseIndex)
  }
}

export { test, given }
export default { test, given }
