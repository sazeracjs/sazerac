'use strict'

import context from '../src/context';
import { runTests } from './helpers'
import { assert } from 'chai';

function MockFn() { }

runTests([

  [context.init, 'context.init', []],

  [context.addCase, 'context.addCase', [

    [
      'when given context with no cases',
      [{ cases: [] }, {'0':'arg_one', '1':'arg_two'}],
      [
        [
          'should return context with a new case',
          (ret) => {
            const { context: ctx } = ret
            assert.equal(ctx.cases.length, 1)
          }
        ],
        [
          'should return context with a new case with inputParams set to arguments',
          (ret) => {
            const { context: ctx } = ret
            assert.deepEqual(ctx.cases[0].inputParams, ['arg_one', 'arg_two'])
          }
        ],
        [
          'should return context with a new case with a describe property set to stringified arguments',
          (ret) => {
            const { context: ctx } = ret
            assert.equal(ctx.cases[0].describeMessage, "when given 'arg_one' and 'arg_two'")
          }
        ],
        [
          'should return caseIndex of 0',
          (ret) => {
            const { caseIndex } = ret
            assert.equal(caseIndex, 0)
          }
        ]
      ]
    ],

    [
      'when given context with an existing case',
      [{ cases: [{ mockProp: 'existing_case' }] }, {}],
      [
        [
          'should return context with a new case',
          (ret) => {
            const { context: ctx } = ret
            assert.equal(ctx.cases.length, 2)
          }
        ],
        [ 
          'should return context where the order of existing cases is unchanged',
          (ret) => {
            const { context: ctx } = ret
            assert.equal(ctx.cases[0].mockProp, 'existing_case')
          }
        ],
        [
          'should return caseIndex of 1',
          (ret) => {
            const { caseIndex } = ret
            assert.equal(caseIndex, 1)
          }
        ]
      ]
    ],

    [
      'when given no arguments',
      [{ cases: [] }, {}],
      [
        [
          'should return context with a new case with blank inputParams array',
          (ret) => {
            const { context: ctx } = ret
            assert.deepEqual(ctx.cases[0].inputParams, [])
          }
        ],
        [
          'should return context with a new case with a describe property set to no arguments message',
          (ret) => {
            const { context: ctx } = ret
            assert.equal(ctx.cases[0].describeMessage, 'when called')
          }
        ]
      ]
    ],

    [
      'when given non-string arguments',
      [{ cases: [] }, {'0':1, '1':2}],
      [
        [
          'should return context with a new case with a describe property set from non-string formatted arguments',
          (ret) => {
            const { context: ctx } = ret
            assert.equal(ctx.cases[0].describeMessage, 'when given 1 and 2')
          }
        ]
      ]
    ]

  ]],

  [context.addExpectedValue, 'context.addExpectedValue', [

    [
      'when given a context, caseIndex, and expectedValue',
      [ { cases: [ { p: 'case_0'}, { p: 'case_1' } ] }, 1, 'mock_expected_val' ],
      [
        [
          'should return context with expected value added to the case at caseIndex',
          (ctx) => { assert.deepPropertyVal(ctx, 'cases[1].expectedValue', 'mock_expected_val') }
        ],
        [
          'should return context with should message set from expected value',
          (ctx) => { assert.deepPropertyVal(ctx, 'cases[1].shouldMessage', "should return 'mock_expected_val'") }
        ],
        [
          'should return context without expected value added to the case not at caseIndex',
          (ctx) => { assert.notDeepProperty(ctx, 'cases[0].expectedValue') }
        ],
      ]
    ]

  ]],

  [context.setDescribeMessage, 'context.setDescribeMessage', [

    [
      'when given a context with multiple cases, applyToAll=undefined, and a message',
      [
        { 
          cases: [
            {contextActive: false, p: 'inactive_0'},
            {contextActive: true, p: 'active_1'},
            {contextActive: true, p: 'active_2'}
          ] 
        },
        undefined,
        'mock_msg'
      ],
      [
        [
          'should set describeMessage to the message for all active cases',
          (ret) => {
            assert.deepPropertyVal(ret, 'cases[1].describeMessage', 'mock_msg')
            assert.deepPropertyVal(ret, 'cases[2].describeMessage', 'mock_msg')
          }
        ],
        [
          'should not set describeMessage for inactive cases',
          (ret) => {
            assert.notDeepProperty(ret, 'cases[0].describeMessage')
          }
        ]
      ]
    ],

    [
      'when given a context with multiple cases, applyToAll=true, and a message',
      [
        { 
          cases: [
            {contextActive: false, p: 'inactive_0'},
            {contextActive: true, p: 'active_1'},
            {contextActive: true, p: 'active_2'}
          ] 
        },
        true,
        'mock_msg'
      ],
      [
        [
          'should set describeMessage to the message for all cases (active and inactive)',
          (ret) => {
            assert.deepPropertyVal(ret, 'cases[0].describeMessage', 'mock_msg')
            assert.deepPropertyVal(ret, 'cases[1].describeMessage', 'mock_msg')
            assert.deepPropertyVal(ret, 'cases[2].describeMessage', 'mock_msg')
          }
        ]
      ]
    ]

  ]]
])
