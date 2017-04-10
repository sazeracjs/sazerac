import { assert } from 'chai'
import sinon from 'sinon'

import { 
  testExecuter,
  errorTestExecuter,
  buildDescriberDefinition,
  executeDescribers,
  __RewireAPI__ as describerRewireAPI
} from 'describer'

const mocks = {}

const testMock = {
  fn: () => { return 'mock_actual_val' }
}

const errorTestMock = {
  fnThrows: () => { throw new Error('mock actual error msg') },
  fnDoesNotThrow: () => {}
}

const mockFrameworkFuncs = { describeFn: 'describe_fn_mock', itFn: 'it_fn_mock' }

describe('testExecuter()', () => {

  beforeEach(() => {
    mocks.deepEqual = sinon.spy()
    describerRewireAPI.__Rewire__('deepEqual', mocks.deepEqual)
    sinon.spy(testMock, 'fn')
    testExecuter(testMock.fn, [1,2], 'mock_expected_val')
  })

  afterEach(() => {
    testMock.fn.restore()
  })

  it('should call deepEqual once', () => {
    assert.isTrue(mocks.deepEqual.calledOnce)
  })

  it('should call deepEqual with actual value as the first argument', () => {
    assert.equal(mocks.deepEqual.args[0][0], 'mock_actual_val')
    assert.isTrue(mocks.deepEqual.calledOnce)
  })

  it('should call deepEqual with expected value as the second argument', () => {
    assert.equal(mocks.deepEqual.args[0][1], 'mock_expected_val')
  })

  it('should call the test function input params as arguments', () => {
    assert.isTrue(testMock.fn.calledWith(1, 2))
  })

})

describe('errorTestExecuter()', () => {

  beforeEach(() => {
    mocks.deepEqual = sinon.spy()
    describerRewireAPI.__Rewire__('deepEqual', mocks.deepEqual)
    sinon.spy(errorTestMock, 'fnThrows')
    errorTestExecuter(errorTestMock.fnThrows, [1,2], 'mock expected error msg')
  })

  afterEach(() => {
    errorTestMock.fnThrows.restore()
  })

  it('should call deepEqual with actual thrown error message as the first argument', () => {
    assert.equal(mocks.deepEqual.args[0][0], 'mock actual error msg')
    assert.isTrue(mocks.deepEqual.calledOnce)
  })

  it('should call deepEqual with expected error message as the second argument', () => {
    assert.equal(mocks.deepEqual.args[0][1], 'mock expected error msg')
  })

  it('should call the test function input params as arguments', () => {
    assert.isTrue(errorTestMock.fnThrows.calledWith(1, 2))
  })

})

// TODO: test assertionExecuter

describe('executeDescribers()', () => {

  const mocks = {
    testExecuter: () => {},
    errorTestExecuter: () => {},
    assertionExecuter: () => {}
  }
  const mockFrameworkFn = (_, fn) => { fn() }

  beforeEach(() => {
    sinon.spy(mocks, 'testExecuter')
    sinon.spy(mocks, 'errorTestExecuter')
    sinon.spy(mocks, 'assertionExecuter')
    describerRewireAPI.__Rewire__('testExecuter', mocks.testExecuter)
    describerRewireAPI.__Rewire__('errorTestExecuter', mocks.errorTestExecuter)
    describerRewireAPI.__Rewire__('assertionExecuter', mocks.assertionExecuter)
  })

  afterEach(() => {
    mocks.testExecuter.restore()
    mocks.errorTestExecuter.restore()
    mocks.assertionExecuter.restore()
    describerRewireAPI.__ResetDependency__('testExecuter')
    describerRewireAPI.__ResetDependency__('errorTestExecuter')
    describerRewireAPI.__ResetDependency__('assertionExecuter')
  })

  const tests = [
    {
      describe: 'when called with an expected value of null',
      definition: {
        func: mockFrameworkFn,
        test: {
          testFn: 'testFn',
          inputParams: 'inputParams',
          expectation: { value: null }
        }
      },
      assertions: [
        [
          'should call testExecuter with the expected value',
          () => {
            assert.equal(mocks.testExecuter.args[0][0], 'testFn')
            assert.equal(mocks.testExecuter.args[0][1], 'inputParams')
            assert.equal(mocks.testExecuter.args[0][2], null)
          }
        ]
      ]
    },
    {
      describe: 'when called with an expected value of undefined',
      definition: {
        func: mockFrameworkFn,
        test: {
          testFn: 'testFn',
          inputParams: 'inputParams',
          expectation: { value: undefined }
        }
      },
      assertions: [
        [
          'should call testExecuter with the expected value of undefined',
          () => {
            assert.equal(mocks.testExecuter.args[0][0], 'testFn')
            assert.equal(mocks.testExecuter.args[0][1], 'inputParams')
            assert.equal(mocks.testExecuter.args[0][2], undefined)
          }
        ]
      ]
    },
    {
      describe: 'when called with an expected error',
      definition: {
        func: mockFrameworkFn,
        test: {
          testFn: 'testFn',
          inputParams: 'inputParams',
          expectation: { error: 'mock error msg'}
        }
      },
      assertions: [
        [
          'should call errorTestExecuter with the expected error',
          () => {
            assert.equal(mocks.errorTestExecuter.args[0][0], 'testFn')
            assert.equal(mocks.errorTestExecuter.args[0][1], 'inputParams')
            assert.equal(mocks.errorTestExecuter.args[0][2], 'mock error msg')
          }
        ]
      ]
    },
    {
      describe: 'when called without an expectation',
      definition: {
        func: mockFrameworkFn,
        test: { testFn: 'testFn', inputParams: 'inputParams' }
      },
      assertions: [
        [
          'should not call testExecuter',
          () => { assert.isFalse(mocks.testExecuter.called) }
        ]
      ]
    },
    {
      describe: 'when called with an array of before and after functions',
      definition: {
        func: mockFrameworkFn,
        test: { 
          testFn: 'testFn',
          inputParams: 'inputParams', 
          expectation: { value: 'expectedVal' },
          beforeFns: [sinon.spy(), sinon.spy()],
          afterFns: [sinon.spy(), sinon.spy()]
        }
      },
      assertions: [
        [
          'should execute the before functions',
          (def) => {
            assert.isTrue(def.test.beforeFns[0].called)
            assert.isTrue(def.test.beforeFns[1].called)
          }
        ],
        [
          'should execute the after functions',
          (def) => {
            assert.isTrue(def.test.afterFns[0].called)
            assert.isTrue(def.test.afterFns[1].called)
          }
        ]
      ]
    }
  ]

  tests.forEach((t) => {
    describe(t.describe, () => {
      t.assertions.forEach((assertion) => {
        const [should, assertFn] = assertion
        it(should, () => {
          executeDescribers(t.definition)
          assertFn(t.definition)
        })
      })
    })
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
              test: {
                testFn: 'mock_test_fn',
                inputParams: 'mock_input_params',
                expectation: { value: 'mock_expected_val' },
                beforeFns: [() => { }, () => { }],
                afterFns: [() => { }, () => { }]
              }
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
              test: {
                testFn: 'mock_test_fn',
                inputParams: 'mock_input_params_2',
                assertFn: 'mock_assert_fn'
                beforeFns: [() => { }, () => { }],
                afterFns: [() => { }, () => { }]
              }
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
              expectation: { value: 'mock_expected_val' }
            },
            { 
              describeMessage: 'mock_describe_msg_2',
              shouldMessage: 'mock_should_msg_2',
              inputParams: 'mock_input_params_2',
              expectation: { value: 'mock_expected_val_2' }
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
          s + 'a test object for each it call',
          (def) => {
            assert.deepProperty(def, 'calls[0].calls[0].test')
            assert.deepProperty(def, 'calls[1].calls[0].test')
          }
        ],
        [
          s + 'a test array for each it call with context.testFunction set',
          (def) => {
            assert.deepPropertyVal(def, 'calls[0].calls[0].test.testFn', 'mock_test_fn')
            assert.deepPropertyVal(def, 'calls[1].calls[0].test.testFn', 'mock_test_fn')
          }
        ],
        [
          s + 'a test array for each it call with the case\'s inputParams set',
          (def) => {
            assert.deepPropertyVal(def, 'calls[0].calls[0].test.inputParams', 'mock_input_params')
            assert.deepPropertyVal(def, 'calls[1].calls[0].test.inputParams', 'mock_input_params_2')
          }
        ],
        [
          s + 'a test array for each it call with the case\'s expectation set',
          (def) => {
            assert.deepPropertyVal(def, 'calls[0].calls[0].test.expectation.value', 'mock_expected_val')
            assert.deepPropertyVal(def, 'calls[1].calls[0].test.expectation.value', 'mock_expected_val_2')
          }
        ]
      ]
    },

    {
      inputs: [
        'when given a valid context object with cases and caseAssertions',
        {
          describeMessage: 'myFunc()',
          testFunction: 'mock_test_fn',
          cases: [
            { describeMessage: 'mock_describe_msg_0', inputParams: 'mock_input_params' },
            { describeMessage: 'mock_describe_msg_1', inputParams: 'mock_input_params_2' }
          ],
          caseAssertions: [
            {
              assertFn: 'mock_assert_fn_0',
              shouldMessage: 'mock_assert_should_message_0_case_0',
              caseIndex: 0,
            },
            {
              assertFn: 'mock_assert_fn_1',
              shouldMessage: 'mock_assert_should_message_1_case_1',
              caseIndex: 1,
            },
            {
              assertFn: 'mock_assert_fn_2',
              shouldMessage: 'mock_assert_should_message_2_case_1',
              caseIndex: 1,
            }
          ]
        }
      ],
      assertions: [
        
        [
          s + 'an it call for each assertion',
          (def) => {
            assert.deepPropertyVal(def, 'calls[0].calls.length', 1)
            assert.deepPropertyVal(def, 'calls[0].calls[0].func', 'it_fn_mock')
            assert.deepPropertyVal(def, 'calls[1].calls.length', 2)
            assert.deepPropertyVal(def, 'calls[1].calls[0].func', 'it_fn_mock')
          }
        ],
        [
          s + 'a message prop for each it call, set based on each assertion\'s shouldMessage',
          (def) => {
            assert.deepPropertyVal(def, 'calls[0].calls[0].message', 'mock_assert_should_message_0_case_0')
            assert.deepPropertyVal(def, 'calls[1].calls[0].message', 'mock_assert_should_message_1_case_1')
            assert.deepPropertyVal(def, 'calls[1].calls[1].message', 'mock_assert_should_message_2_case_1')
          }
        ],
        [
          s + 'a test object for each it call',
          (def) => {
            assert.deepProperty(def, 'calls[0].calls[0].test')
            assert.deepProperty(def, 'calls[1].calls[0].test')
            assert.deepProperty(def, 'calls[1].calls[1].test')
          }
        ],
        [
          s + 'a test array for each it call with context.testFunction set',
          (def) => {
            assert.deepPropertyVal(def, 'calls[0].calls[0].test.testFn', 'mock_test_fn')
            assert.deepPropertyVal(def, 'calls[1].calls[0].test.testFn', 'mock_test_fn')
            assert.deepPropertyVal(def, 'calls[1].calls[1].test.testFn', 'mock_test_fn')
          }
        ],
        [
          s + 'a test array for each it call with each assertion\'s inputParams set',
          (def) => {
            assert.deepPropertyVal(def, 'calls[0].calls[0].test.inputParams', 'mock_input_params')
            assert.deepPropertyVal(def, 'calls[1].calls[0].test.inputParams', 'mock_input_params_2')
            assert.deepPropertyVal(def, 'calls[1].calls[1].test.inputParams', 'mock_input_params_2')
          }
        ],
        [
          s + 'a test array for each it call with each assertion\'s assertFn st',
          (def) => {
            assert.deepPropertyVal(def, 'calls[0].calls[0].test.assertFn', 'mock_assert_fn_0')
            assert.deepPropertyVal(def, 'calls[1].calls[0].test.assertFn', 'mock_assert_fn_1')
            assert.deepPropertyVal(def, 'calls[1].calls[1].test.assertFn', 'mock_assert_fn_2')
          }
        ]
      ]
    },

    {
      inputs: [
        'when given a valid context object with multiple assertions, and before/after functions',
        {
          describeMessage: 'myFunc()',
          testFunction: 'mock_test_fn',
          cases: [
            { describeMessage: 'mock_describe_msg_0', inputParams: 'mock_input_params' },
            { describeMessage: 'mock_describe_msg_1', inputParams: 'mock_input_params_2' }
          ],
          beforeFunctions: [
            {
              beforeFn: 'mock_before_fn_0',
              caseIndex: 0,
            },
            {
              beforeFn: 'mock_before_fn_1',
              caseIndex: 0,
            },
            {
              beforeFn: 'mock_before_fn_2',
              caseIndex: 1,
            }
          ],
          afterFunctions: [
            {
              afterFn: 'mock_after_fn_0',
              caseIndex: 0,
            },
            {
              afterFn: 'mock_after_fn_1',
              caseIndex: 1,
            },
            {
              afterFn: 'mock_after_fn_2',
              caseIndex: 1,
            }
          ],
          caseAssertions: [
            {
              assertFn: 'mock_assert_fn_0',
              shouldMessage: 'mock_assert_should_message_0_case_0',
              caseIndex: 0,
            },
            {
              assertFn: 'mock_assert_fn_1',
              shouldMessage: 'mock_assert_should_message_1_case_1',
              caseIndex: 1,
            },
            {
              assertFn: 'mock_assert_fn_2',
              shouldMessage: 'mock_assert_should_message_2_case_1',
              caseIndex: 1,
            }
          ]
        }
      ],
      assertions: [
        [
          s + 'a test array with before functions for each it call',
          (def) => {
            assert.deepPropertyVal(def, 'calls[0].calls[0].test.beforeFns[0]', 'mock_before_fn_0')
            assert.deepPropertyVal(def, 'calls[0].calls[0].test.beforeFns[1]', 'mock_before_fn_1')
            assert.notDeepProperty(def, 'calls[0].calls[0].test.beforeFns[2]')
            assert.deepPropertyVal(def, 'calls[1].calls[0].test.beforeFns[0]', 'mock_before_fn_2')
            assert.notDeepProperty(def, 'calls[1].calls[0].test.beforeFns[1]')
            assert.deepPropertyVal(def, 'calls[1].calls[1].test.beforeFns[0]', 'mock_before_fn_2')
            assert.notDeepProperty(def, 'calls[1].calls[1].test.beforeFns[1]')
          }
        ],
        [
          s + 'a test array with after functions for each it call',
          (def) => {
            assert.deepPropertyVal(def, 'calls[0].calls[0].test.afterFns[0]', 'mock_after_fn_0')
            assert.notDeepProperty(def, 'calls[0].calls[0].test.afterFns[1]')
            assert.deepPropertyVal(def, 'calls[1].calls[0].test.afterFns[0]', 'mock_after_fn_1')
            assert.deepPropertyVal(def, 'calls[1].calls[0].test.afterFns[1]', 'mock_after_fn_2')
            assert.notDeepProperty(def, 'calls[1].calls[0].test.afterFns[2]')
            assert.deepPropertyVal(def, 'calls[1].calls[1].test.afterFns[0]', 'mock_after_fn_1')
            assert.deepPropertyVal(def, 'calls[1].calls[1].test.afterFns[1]', 'mock_after_fn_2')
            assert.notDeepProperty(def, 'calls[1].calls[1].test.afterFns[2]')
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
