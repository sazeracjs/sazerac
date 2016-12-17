'use strict'

import context from './context'
import describer from './describer'

const frameworkFns = {
  describeFn: describe,
  itFn: it
}

const test = (fn) => {
  const ctx = context.init(fn)
  return chain(ctx)
}

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

const runFn = (ctx) => {
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
}

export default chain()
