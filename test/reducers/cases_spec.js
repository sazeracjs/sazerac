import { assert } from 'chai'
import { runTests } from '../helpers'
import cases from '../../src/reducers/cases'
import expectationTypes from '../../src/expectationTypes'

cases.__Rewire__('defaultDescribeCase', (args) => { return JSON.stringify(args) })
cases.__Rewire__('defaultShouldMessage', (args) => { return JSON.stringify(args) })
cases.__Rewire__('defaultShouldThrowMessage', (arg) => { return `should_throw_${arg}` })

runTests([

  [cases, 'cases() ADD_CASE', [

    [
      'when given an undefined state, and action.args is an array',
      [undefined, { type: 'ADD_CASE', args: ['one', 'two'] }],
      [
        [
          'should return an array with one object',
          (ret) => { assert.equal(ret.length, 1) }
        ],
        [
          'should return an array with one object with inputParams set',
          (ret) => {
            assert.deepPropertyVal(ret, '[0].inputParams[0]', 'one')
            assert.deepPropertyVal(ret, '[0].inputParams[1]', 'two')
          }
        ],
        [
          'should return an array with one object with describeMessage set',
          (ret) => {
            assert.deepProperty(ret, '[0].describeMessage')
          }
        ],
        [
          'should have called defaultDescribeCase with inputParams',
          (ret) => {
            assert.deepPropertyVal(ret, '[0].describeMessage', '["one","two"]')
          }
        ]
      ]
    ],

    [
      'when given a populated array, and action.args is an array',
      [['obj'], { type: 'ADD_CASE', args: ['one', 'two'] }],
      [
        [
          'should return an array with new case added',
          (ret) => {
            assert.equal(ret.length, 2)
            assert.deepPropertyVal(ret, '[1].inputParams[0]', 'one')
            assert.deepPropertyVal(ret, '[1].inputParams[1]', 'two')
          }
        ]
      ]
    ],

    [
      'when action.args is an array-like object',
      [undefined, { type: 'ADD_CASE', args: {'0':'one', '1':'two'} }],
      [
        [
          'should have called defaultDescribeCase with an array converted from the array-like object',
          (ret) => {
            assert.deepPropertyVal(ret, '[0].describeMessage', '["one","two"]')
          }
        ]
      ]
    ]
  ]]
])

runTests([

  [cases, 'cases() SET_CASE_EXPECTATION', [

    [
      'when given an array of cases, action.caseIndex, action.expectation, and expectationType.VALUE',
      [
        [ { p: 'case_0'}, { p: 'case_1' } ],
        {
          type: 'SET_CASE_EXPECTATION',
          caseIndex: 1,
          expectation: 'mock_expected_val',
          expectationType: expectationTypes.VALUE
        }
      ],
      [
        [
          'should return cases with expectation.value added to the case at caseIndex',
          (cases) => { assert.deepPropertyVal(cases, '[1].expectation.value', 'mock_expected_val') }
        ],
        [
          'should return cases with should message set from expected value',
          (cases) => { assert.deepPropertyVal(cases, '[1].shouldMessage', '"mock_expected_val"') }
        ],
        [
          'should return cases without expectation added to the case not at caseIndex',
          (cases) => { assert.notDeepProperty(cases, '[0].expectation') }
        ]
      ]
    ],
    
    [
      'when given expectationType.ERROR',
      [
        [ { p: 'case_1' } ],
        { 
          type: 'SET_CASE_EXPECTATION',
          caseIndex: 0,
          expectation: 'mock_expected_err',
          expectationType: expectationTypes.ERROR,
        }
      ],
      [
        [
          'should return cases with expectation.error added to the case at caseIndex',
          (cases) => { assert.deepPropertyVal(cases, '[0].expectation.error', 'mock_expected_err') }
        ],
        [
          'should set should message to default throw message',
          (cases) => { assert.deepPropertyVal(cases, '[0].shouldMessage', 'should_throw_mock_expected_err') }
        ]
      ]
    ],

    [
      'when given a case without shouldMessage set, and action.message',
      [
        [ { p: 'case_1' } ],
        { 
          type: 'SET_CASE_EXPECTATION',
          caseIndex: 0,
          expectation: 'mock_expected_val',
          expectationType: expectationTypes.VALUE,
          message: 'mock_msg'
        }
      ],
      [
        [
          'should return case with should message set from action.message',
          (cases) => { assert.deepPropertyVal(cases, '[0].shouldMessage', 'mock_msg') }
        ]
      ]
    ],

    [
      'when given a case with shouldMessage set, and action.message',
      [
        [ { shouldMessage: 'old_mock_msg' } ],
        { 
          type: 'SET_CASE_EXPECTATION',
          caseIndex: 0,
          expectation: 'mock_expected_val',
          expectationType: expectationTypes.VALUE,
          message: 'new_mock_msg'
        }
      ],
      [
        [
          'should return case with should message overwritten with action.message',
          (cases) => { assert.deepPropertyVal(cases, '[0].shouldMessage', 'new_mock_msg') }
        ]
      ]
    ],

    [
      'when given a case with shouldMessage set, action.caseIndex, and action.expectation',
      [
        [ { shouldMessage: 'mock_should_msg' } ],
        {
          type: 'SET_CASE_EXPECTATION',
          caseIndex: 0,
          expectation: 'mock_expected_val',
          expectationType: expectationTypes.VALUE
        }
      ],
      [
        [
          'should not change from the original shouldMessage value',
          (cases) => { assert.deepPropertyVal(cases, '[0].shouldMessage', 'mock_should_msg') }
        ]
      ]
    ],

    [
      'when given a case with shouldMessage set',
      [
        [ { shouldMessage: 'should return %s' } ],
        {
          type: 'SET_CASE_EXPECTATION',
          caseIndex: 0,
          expectation: 'mock_expected_val',
          expectationType: expectationTypes.VALUE
        }
      ],
      [
        [
          'should not change from the original shouldMessage value',
          (cases) => { 
            assert.deepPropertyVal(
              cases, 
              '[0].shouldMessage',
              'should return mock_expected_val'
            ) 
          }
        ]
      ]
    ]

  ]]
])

runTests([

  [cases, 'cases() SET_CASE_DESCRIBE_MESSAGE', [

    [
      'when given an array of cases, action.caseIndex, and action.message',
      [
        [ { p: 'case_0'}, { p: 'case_1' } ],
        { type: 'SET_CASE_DESCRIBE_MESSAGE', caseIndex: 1, message: 'mock_describe_msg' }
      ],
      [
        [
          'should return cases with describeMessage added to the case at caseIndex',
          (cases) => { assert.deepPropertyVal(cases, '[1].describeMessage', 'mock_describe_msg') }
        ],
        [
          'should return cases without expected value added to the case not at caseIndex',
          (cases) => { assert.notDeepProperty(cases, '[0].describeMessage') }
        ]
      ]
    ],

    [
      'when given a formatted action.message and a case with inputParams',
      [
        [ { inputParams: ['one', 'two'] } ],
        { type: 'SET_CASE_DESCRIBE_MESSAGE', caseIndex: 0, message: 'given %s and %s' }
      ],
      [
        [
          'should return cases with describeMessage formatted with inputParams',
          (cases) => {
            assert.deepPropertyVal(cases, '[0].describeMessage', 'given one and two')
          }
        ]
      ]
    ]

  ]]
])

runTests([

  [cases, 'cases() SET_CASE_SHOULD_MESSAGE', [

    [
      'when given an array of cases, action.caseIndex, and action.message',
      [
        [ { p: 'case_0'}, { p: 'case_1' } ],
        { type: 'SET_CASE_SHOULD_MESSAGE', caseIndex: 1, message: 'mock_should_msg' }
      ],
      [
        [
          'should return cases with shouldMessage added to the case at caseIndex',
          (cases) => { assert.deepPropertyVal(cases, '[1].shouldMessage', 'mock_should_msg') }
        ],
        [
          'should return cases without expected value added to the case not at caseIndex',
          (cases) => { assert.notDeepProperty(cases, '[0].shouldMessage') }
        ]
      ]
    ],

    [
      'when given a formatted action.message and a case with expectedValue',
      [
        [ { expectedValue: 'mock_val' } ],
        { type: 'SET_CASE_SHOULD_MESSAGE', caseIndex: 0, message: 'should return %s' }
      ],
      [
        [
          'should return cases with shouldMessage formatted with expectedValue',
          (cases) => {
            assert.deepPropertyVal(cases, '[0].shouldMessage', 'should return mock_val')
          }
        ]
      ]
    ],

    [
      'when given a formatted action.message and a case without expectedValue',
      [
        [ { } ],
        { type: 'SET_CASE_SHOULD_MESSAGE', caseIndex: 0, message: 'should return %s' }
      ],
      [
        [
          'should return cases with unformatted shouldMessage',
          (cases) => {
            assert.deepPropertyVal(cases, '[0].shouldMessage', 'should return %s')
          }
        ]
      ]
    ]

  ]]

])

runTests([

  [cases, 'cases() INIT', [

    [
      'when given an array of cases',
      [
        [ { p: 'case_0'}, { p: 'case_1' } ],
        { type: 'INIT' }
      ],
      [
        [
          'should return an empty array',
          (cases) => { assert.deepEqual(cases, []) }
        ]
      ]
    ]

  ]]

])

runTests([

  [cases, 'cases() no actionType', [

    [
      'when given an array of cases',
      [
        [ { p: 'case_0'}, { p: 'case_1' } ],
        { }
      ],
      [
        [
          'should return the array of cases',
          (cases) => { assert.deepEqual(cases, [{ p: 'case_0'}, { p: 'case_1' }]) }
        ]
      ]
    ]

  ]]

])
