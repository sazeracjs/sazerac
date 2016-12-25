import { assert } from 'chai'

const stringifyArgs = (args) => {
  return args.map((a) => {
    if (typeof a === 'undefined') return "`undefined`"
    return JSON.stringify(a)
  }).join(', ')
}

const fnName = (n) => {
  return n + (n.indexOf('()') >= 0 ? '' : '()')
}

const runFuncTest = (testFn, testFnName, cases) => {
  describe(fnName(testFnName), () => {
    cases.forEach((testCase) => {
      const { args, expect, before, after, describe: desc, should } = testCase
      describe(desc || 'when given args [' + stringifyArgs(args) + ']', () => {
        if(before) beforeEach(() => { before() })
        if(after) afterEach(() => { after() })
        it(should || 'should return ' + expect, () => {
          assert.deepEqual(testFn.apply(null, args), expect)
        })
      })
    })
  })
}

const runTests = (tests) => {

  tests.forEach((test) => {
    const [testFn, testFnName, cases] = test
    describe(fnName(testFnName), () => {
      cases.forEach((testCase) => {
        const [desc, inputArgs] = testCase
        const asserts = testCase.length === 3 ? testCase[2] : testCase[3]
        const beforeAfterFns = testCase.length === 4 ? testCase[2] : undefined

        describe(desc, () => {
          let actual

          beforeEach(() => {
            if (beforeAfterFns && beforeAfterFns.before) {
              beforeAfterFns.before()
            }
            actual = testFn.apply(null, inputArgs)
          })

          afterEach(() => {
            if (beforeAfterFns && beforeAfterFns.after) {
              beforeAfterFns.after()
            }
          })

          asserts.forEach((a) => {
            const [should, assertFn] = a;
            it(should, () => {
              assertFn(actual)
            })
          })

        })

      })
    })
  })

}

export { runTests, runFuncTest }