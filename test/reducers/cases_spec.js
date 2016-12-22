import { assert } from 'chai'
import { runTests } from '../helpers'
import cases from '../../src/reducers/cases'

cases.__Rewire__('defaultDescribeCase', (args) => { return JSON.stringify(args) })
cases.__Rewire__('defaultShouldMessage', (args) => { return JSON.stringify(args) })

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

  [cases, 'cases() SET_CASE_EXPECTED_VALUE', [

    [
      'when given an array of cases, action.caseIndex, and action.expectedValue',
      [
        [ { p: 'case_0'}, { p: 'case_1' } ],
        { type: 'SET_CASE_EXPECTED_VALUE', caseIndex: 1, expectedValue: 'mock_expected_val' }
      ],
      [
        [
          'should return cases with expected value added to the case at caseIndex',
          (cases) => { assert.deepPropertyVal(cases, '[1].expectedValue', 'mock_expected_val') }
        ],
        [
          'should return cases with should message set from expected value',
          (cases) => { assert.deepPropertyVal(cases, '[1].shouldMessage', '"mock_expected_val"') }
        ],
        [
          'should return cases without expected value added to the case not at caseIndex',
          (cases) => { assert.notDeepProperty(cases, '[0].expectedValue') }
        ],
      ]
    ],

    [
      'when given a case with shouldMessage set, action.caseIndex, and action.expectedValue',
      [
        [ { shouldMessage: 'mock_should_msg' } ],
        { type: 'SET_CASE_EXPECTED_VALUE', caseIndex: 0, expectedValue: 'mock_expected_val' }
      ],
      [
        [
          'should not change from the original shouldMessage value',
          (cases) => { assert.deepPropertyVal(cases, '[0].shouldMessage', 'mock_should_msg') }
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
        ],
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
        ],
      ]
    ]

  ]]

])
