import keys from 'lodash.keys'
import { newTestCase, __RewireAPI__ as testCaseRewireAPI } from '../src/testCase'
import expectationTypes from '../src/expectationTypes'
import { assert } from 'chai'
import sinon from 'sinon'

const actions = {
  setCaseExpectation: () => { },
  setCaseDescribeMessage: () => { },
  setCaseShouldMessage: () => { },
  addCaseAssertion: () => { },
  addCaseBeforeFn: () => { },
  addCaseAfterFn: () => { }
}

describe('testCase', () => {

  let testCase

  beforeEach(() => {
    testCase = newTestCase(222)
    testCaseRewireAPI.__Rewire__('actions', actions)
    keys(actions).forEach((a) => { sinon.spy(actions, a) })
  })

  afterEach(() => {
    keys(actions).forEach((a) => { actions[a].restore() })
  })

  it('should set ___caseIndex on the testCase', () => {
    assert.propertyVal(testCase, '___caseIndex', 222)
  })

  describe('.expect()', () => {

    describe('when called with an expected value', () => {
      beforeEach(() => { testCase.expect('mock_expected_val') })
      it('should call actions.setCaseExpectation() with an object containing ' +
          'caseIndex, expectation, and expectedTypes.VALUE', () => 
      {
        assert.deepEqual(actions.setCaseExpectation.getCall(0).args[0], {
          caseIndex: 222,
          expectationType: expectationTypes.VALUE,
          expectation: 'mock_expected_val',
          message: undefined
        })
      })
    })

    describe('when called with an expected value and a message', () => {
      beforeEach(() => { testCase.expect('mock_expected_val', 'mock_message') })
      it('should call actions.setCaseExpectation() with an object containing caseIndex, ' +
          'expectation, expectedTypes.VALUE, and the message', () =>
      {
        assert.deepEqual(actions.setCaseExpectation.getCall(0).args[0], {
          caseIndex: 222,
          expectationType: expectationTypes.VALUE,
          expectation: 'mock_expected_val',
          message: 'mock_message'
        })
      })
    })

  })

  describe('.expectError()', () => {

    describe('when called with an expected error', () => {
      beforeEach(() => { testCase.expectError('mock_expected_err') })
      it('should call actions.setCaseExpectation() with an object containing ' +
          'caseIndex, expectation, and expectedTypes.ERROR', () => 
      {
        assert.deepEqual(actions.setCaseExpectation.getCall(0).args[0], {
          caseIndex: 222,
          expectationType: expectationTypes.ERROR,
          expectation: 'mock_expected_err',
          message: undefined
        })
      })
    })

  })

  describe('.describe()', () => {
    beforeEach(() => { testCase.describe('mock_describe_msg') })
    it('should call actions.setCaseDescribeMessage() with an object containing caseIndex and message', () => 
    {
      assert.deepEqual(actions.setCaseDescribeMessage.getCall(0).args[0], {
        caseIndex: 222,
        message: 'mock_describe_msg'
      })
    })
  })

  describe('.should()', () => {
    beforeEach(() => { testCase.should('mock_should_message') })
    it('should call actions.setCaseShouldMessage() with an object containing caseIndex and message', () => 
    {
      assert.deepEqual(actions.setCaseShouldMessage.getCall(0).args[0], {
        caseIndex: 222,
        message: 'mock_should_message'
      })
    })
  })

  describe('.assert()', () => {
    beforeEach(() => { testCase.assert('mock_should_message', 'mock_assert_fn') })
    it('should call actions.setCaseShouldMessage() with an object containing ' +
        'caseIndex, shouldMessage, and testFn', () => 
    {
      assert.deepEqual(actions.addCaseAssertion.getCall(0).args[0], {
        caseIndex: 222,
        message: 'mock_should_message',
        assertFn: 'mock_assert_fn'
      })
    })
  })

  describe('.before()', () => {
    beforeEach(() => { testCase.before('mock_before_fn') })
    it('should call actions.addCaseBeforeFn() with an object containing beforeFn', () => 
    {
      assert.deepEqual(actions.addCaseBeforeFn.getCall(0).args[0], {
        caseIndex: 222,
        beforeFn: 'mock_before_fn'
      })
    })
  })

  describe('.after()', () => {
    beforeEach(() => { testCase.after('mock_after_fn') })
    it('should call actions.addCaseAfterFn() with an object containing afterFn', () => 
    {
      assert.deepEqual(actions.addCaseAfterFn.getCall(0).args[0], {
        caseIndex: 222,
        afterFn: 'mock_after_fn'
      })
    })
  })

})
