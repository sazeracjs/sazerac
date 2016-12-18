const runTests = (tests) => {

  tests.forEach((test) => {
    const [testFn, testFnName, cases] = test
    describe(testFnName + '()', () => {
      cases.forEach((testCase) => {
        const [desc, inputArgs, asserts] = testCase
        describe(desc, () => {
          let actual
          beforeEach(() => {
            actual = testFn.apply(null, inputArgs)
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

export { runTests }