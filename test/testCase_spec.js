import { keys } from 'lodash'
import { newTestCase, __RewireAPI__ as testCaseRewireAPI } from '../src/testCase';
import { assert } from 'chai';
import sinon from 'sinon'

const actions = {
  setCaseExpectedValue: () => { },
  setCaseDescribeMessage: () => { },
  setCaseShouldMessage: () => { },
  addCaseAssertion: () => { }
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
      it('should call actions.setCaseExpectedValue() with an object containing caseIndex and expectedValue', () => 
      {
        assert.deepEqual(actions.setCaseExpectedValue.getCall(0).args[0], {
          caseIndex: 222,
          expectedValue: 'mock_expected_val',
          message: undefined
        })
      })
    })

    describe('when called with an expected value and a message', () => {
      beforeEach(() => { testCase.expect('mock_expected_val', 'mock_message') })
      it('should call actions.setCaseExpectedValue() with an object containing caseIndex, ' +
          'expectedValue, and the message', () =>
      {
        assert.deepEqual(actions.setCaseExpectedValue.getCall(0).args[0], {
          caseIndex: 222,
          expectedValue: 'mock_expected_val',
          message: 'mock_message'
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

})
