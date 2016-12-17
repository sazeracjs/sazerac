'use strict'

import { assert } from 'chai'
import sinon from 'sinon'

import { testExecuter, buildDescriberDefinition, __RewireAPI__ as describerRewireAPI } from '../src/describer'

const assertMock = { 
  deepEqual: () => { }
}

const testMock = {
  fn: () => { return 'mock_actual_val' }
}

const mockFrameworkFuncs = { describeFn: 'describe_fn_mock', itFn: 'it_fn_mock' }

describerRewireAPI.__Rewire__('assert', assertMock)

describe('testExecuter()', () => {

  beforeEach(() => {
    sinon.spy(assertMock, 'deepEqual')
    sinon.spy(testMock, 'fn')
    testExecuter(testMock.fn, [1,2], 'mock_expected_val')
  })

  afterEach(() => {
    assertMock.deepEqual.restore()
    testMock.fn.restore()
  })

  it('should call assert.deepEqual once', () => {
    assert.isTrue(assertMock.deepEqual.calledOnce)
  })

  it('should call assert.deepEqual with actual value as the first argument', () => {
    assert.equal(assertMock.deepEqual.args[0][0], 'mock_actual_val')
  })

  it('should call assert.deepEqual with expected value as the second argument', () => {
    assert.equal(assertMock.deepEqual.args[0][1], 'mock_expected_val')
  })

  it('should call the test function input params as arguments', () => {
    assert.isTrue(testMock.fn.calledWith(1, 2))
  })

})

describe('buildDescriberDefinition()', () => {

  /*
   * Example describer defintion:
   *

    {
      func: 'describe_fn_mock',
      message: 'myFunc()',
      calls: [
        {
          func: 'describe_fn_mock',
          message: 'mock_describe_msg',
          calls: [
            {
              func: 'it_fn_mock',
              message: 'mock_should_msg',
              test: ['mock_test_fn', 'mock_input_params', 'mock_expected_val']
            }
          ]
        },
        {
          func: 'describe_fn_mock',
          message: 'mock_describe_msg_2',
          calls: [
            {
              func: 'it_fn_mock',
              message: 'mock_should_msg_2',
              test: ['mock_test_fn', 'mock_input_params_2', 'mock_expected_val_2']
            }
          ]
        }
      ]
    }

  */

  const s = 'should return a defintion with ';

  [
    {
      inputs: [
        'when given a valid context object with multiple cases',
        {
          describeMessage: 'myFunc()',
          testFunction: 'mock_test_fn',
          cases: [
            { 
              describeMessage: 'mock_describe_msg',
              shouldMessage: 'mock_should_msg',
              inputParams: 'mock_input_params',
              expectedValue: 'mock_expected_val' 
            },
            { 
              describeMessage: 'mock_describe_msg_2',
              shouldMessage: 'mock_should_msg_2',
              inputParams: 'mock_input_params_2',
              expectedValue: 'mock_expected_val_2' 
            }
          ]
        }
      ],
      assertions: [
        [
          s + 'root level func prop set to frameworkFunctions.describeFn',
          (def) => { assert.propertyVal(def, 'func', 'describe_fn_mock') }
        ],
        [
          s + 'root level message prop set to context.describeMessage',
          (def) => { assert.propertyVal(def, 'message', 'myFunc()') }
        ],
        [
          s + 'a call for each case',
          (def) => { assert.deepPropertyVal(def, 'calls.length', 2) }
        ],
        [
          s + 'a message prop for each case call, set to that case\'s describeMessage',
          (def) => {
            assert.deepPropertyVal(def, 'calls[0].message', 'mock_describe_msg')
            assert.deepPropertyVal(def, 'calls[1].message', 'mock_describe_msg_2')
          }
        ],
        [
          s + 'a func prop for each case call, set to frameworkFunctions.describeFn',
          (def) => {
            assert.deepPropertyVal(def, 'calls[0].func', 'describe_fn_mock')
            assert.deepPropertyVal(def, 'calls[1].func', 'describe_fn_mock')
          }
        ],
        [
          s + 'an it call for each case',
          (def) => {
            assert.deepPropertyVal(def, 'calls[0].calls.length', 1)
            assert.deepPropertyVal(def, 'calls[0].calls[0].func', 'it_fn_mock')
            assert.deepPropertyVal(def, 'calls[1].calls.length', 1)
            assert.deepPropertyVal(def, 'calls[1].calls[0].func', 'it_fn_mock')
          }
        ],
        [
          s + 'a message prop for each it call, set to that case\'s shouldMessage',
          (def) => {
            assert.deepPropertyVal(def, 'calls[0].calls[0].message', 'mock_should_msg')
            assert.deepPropertyVal(def, 'calls[1].calls[0].message', 'mock_should_msg_2')
          }
        ],
        [
          s + 'a test array for each it call',
          (def) => {
            assert.deepPropertyVal(def, 'calls[0].calls[0].test.length', 3)
            assert.deepPropertyVal(def, 'calls[1].calls[0].test.length', 3)
          }
        ],
        [
          s + 'a test array for each it call with context.testFunction set at index 0',
          (def) => {
            assert.deepPropertyVal(def, 'calls[0].calls[0].test[0]', 'mock_test_fn')
            assert.deepPropertyVal(def, 'calls[1].calls[0].test[0]', 'mock_test_fn')
          }
        ],
        [
          s + 'a test array for each it call with the case\'s inputParams set at index 1',
          (def) => {
            assert.deepPropertyVal(def, 'calls[0].calls[0].test[1]', 'mock_input_params')
            assert.deepPropertyVal(def, 'calls[1].calls[0].test[1]', 'mock_input_params_2')
          }
        ],
        [
          s + 'a test array for each it call with the case\'s expectedValue set at index 2',
          (def) => {
            assert.deepPropertyVal(def, 'calls[0].calls[0].test[2]', 'mock_expected_val')
            assert.deepPropertyVal(def, 'calls[1].calls[0].test[2]', 'mock_expected_val_2')
          }
        ]
      ]
    }
  ].forEach((t) => {
    const { inputs, assertions } = t
    const [ desc, context ] = inputs
    describe(desc, () => {
      assertions.forEach((a) => {
        const [ should, assertFn ] = a
        it(should, () => {
          assertFn(buildDescriberDefinition(context, mockFrameworkFuncs))
        })
      })
    })

  })

})
