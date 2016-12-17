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

/*
const givenFn = (ctx) => {
  return (...args) => {
    const newCtx = context.addCase(ctx, args)
    return chain(newCtx)
  }
}

const expectFn = (ctx) => {
  return (expectedVal) => {
    const newCtx = context.addExpectedValue(ctx, expectedVal)
    return chain(newCtx)
  }
}

const describeFn = (ctx, applyToAll) => {
  return (message) => {
    const newCtx = context.setDescribeMessage(ctx, applyToAll, message);
    return chain(newCtx)
  }
}
*/

/*const runFn = (ctx) => {
  return () => {
    describer(ctx, frameworkFns)
  }
}

const chain = (ctx) => {
  return {
    test: test,
    given: givenFn(ctx),
    expect: expectFn(ctx),
    run: runFn(ctx),
    describe: describeFn(ctx),
    all: {
      describe: describeFn(ctx, true)
    }
  }
}*/
