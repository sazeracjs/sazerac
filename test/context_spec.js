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

  ]]
  
])
