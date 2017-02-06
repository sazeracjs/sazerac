import { newTestCaseCollection } from '../src/testCaseCollection'
import { assert } from 'chai'
import sinon from 'sinon'

const newTestCase = () => {
  return {
    expect: () => { },
    describe: () => { },
    should: () => { },
    assert: () => { }
  }
}

describe('testCaseCollection', () => {

  let testCases, tCase_1, tCase_2, tCase_3
  const fnNames = ['expect', 'describe', 'should', 'assert']

  const spyOnTestCaseFns = (tCase) => {
    fnNames.forEach((fnName) => {
      sinon.spy(tCase, fnName)
    })
  }

  const restoreTestCaseFns = (tCase) => {
    fnNames.forEach((fnName) => {
      tCase[fnName].restore()
    })
  }

  beforeEach(() => {
    tCase_1 = newTestCase()
    tCase_2 = newTestCase()
    tCase_3 = newTestCase()
    spyOnTestCaseFns(tCase_1)
    spyOnTestCaseFns(tCase_2)
    spyOnTestCaseFns(tCase_3)
    testCases = newTestCaseCollection([ tCase_1, tCase_2, tCase_3 ])
  })

  afterEach(() => {
    restoreTestCaseFns(tCase_1)
    restoreTestCaseFns(tCase_2)
    restoreTestCaseFns(tCase_3)
  })

  fnNames.forEach((fnName) => {
    describe('when ' + fnName + '() is called with multiple arguments', () => {

      beforeEach(() => {
        testCases[fnName]('arg_1', 'arg_2')
      })

      it('should call ' + fnName + '() on each testCase within the testCaseCollection', () => {
        assert.isTrue(tCase_1[fnName].calledOnce)
      })

      it('should pass args to ' + fnName + '() call on each testCase within the testCaseCollection', () => {
        assert.equal(tCase_1[fnName].getCall(0).args[0], 'arg_1')
        assert.equal(tCase_1[fnName].getCall(0).args[1], 'arg_2')
      })

    })
  })

})
