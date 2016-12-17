'use strict'

import context from '../src/context';
import { assert } from 'chai';

function MockFn() { }

const tests = [

  [context.init, [

    [
      'when given a function', [MockFn], [
        [
          'should return context with a testFunction property set to the function',
          (ret) => { assert.equal(ret.testFunction, MockFn) }
        ],
        [
          'should return context with a cases property set to an empty array',
          (ret) => { assert.deepEqual(ret.cases, []) }
        ],
        [
          'should return context with a describe property set to the function name',
          (ret) => { assert.equal(ret.describeMessage, 'MockFn()') }
        ]
      ]
    ],

    [
      'when given a function and a describe message', [MockFn, 'mock_describe_msg'], [
        [
          'should return context with a describe property set to the describe message param',
          (ret) => { assert.equal(ret.describeMessage, 'mock_describe_msg') }
        ]
      ]
    ]

  ]],

  [context.addCase, [

    [
      'when given context with no cases',
      [{ cases: [] }, {'0':'arg_one', '1':'arg_two'}],
      [
        [
          'should return context with a new case',
          (ctx) => { assert.equal(ctx.cases.length, 1) }
        ],
        [
          'should return context with a new case with inputParams set to arguments',
          (ctx) => { assert.deepEqual(ctx.cases[0].inputParams, ['arg_one', 'arg_two']) }
        ],
        [
          'should return context with a new case with contextActive:true',
          (ctx) => { assert.isTrue(ctx.cases[0].contextActive) }
        ],
        [
          'should return context with a new case with a describe property set to stringified arguments',
          (ctx) => { assert.equal(ctx.cases[0].describeMessage, "when given 'arg_one' and 'arg_two'") }
        ]
      ]
    ],

    [
      'when given context with an existing case with contextActive:true',
      [{ cases: [{ contextActive: true, mockProp: 'existing_case' }] }, {}],
      [
        [
          'should return context with a new case',
          (ctx) => { assert.equal(ctx.cases.length, 2) }
        ],
        [ 
          'should return context where existing case has contextActive:false',
          (ctx) => { assert.isFalse(ctx.cases[0].contextActive) }
        ],
        [ 
          'should return context where the order of existing cases is unchanged',
          (ctx) => { assert.equal(ctx.cases[0].mockProp, 'existing_case') }
        ]
      ]
    ],

    [
      'when given no arguments',
      [{ cases: [] }, {}],
      [
        [
          'should return context with a new case with blank inputParams array',
          (ctx) => { assert.deepEqual(ctx.cases[0].inputParams, []) }
        ],
        [
          'should return context with a new case with a describe property set to no arguments message',
          (ctx) => { assert.equal(ctx.cases[0].describeMessage, 'when called') }
        ]
      ]
    ],

    [
      'when given non-string arguments',
      [{ cases: [] }, {'0':1, '1':2}],
      [
        [
          'should return context with a new case with a describe property set from non-string formatted arguments',
          (ctx) => { assert.equal(ctx.cases[0].describeMessage, 'when given 1 and 2') }
        ]
      ]
    ]

  ]],

  [context.addExpectedValue, [

    [
      'when given context with a case with contextActive:true',
      [
        { 
          cases: [
            {contextActive: false, p: 'inactive'}, {contextActive: true, p: 'active'}
          ] 
        },
        'mock_expected_val'
      ],
      [
        [
          'should return context with expected value added to the active case',
          (ctx) => {
            assert.equal(ctx.cases[1].p, 'active')
            assert.equal(ctx.cases[1].expectedValue, 'mock_expected_val')
          }
        ],
        [
          'should return context with should message set from expected value',
          (ctx) => {
            assert.equal(ctx.cases[1].shouldMessage, "should return 'mock_expected_val'")
          }
        ]
      ]
    ],

    [
      'when given context with multiple cases with contextActive:true',
      [
        { 
          cases: [
            {contextActive: false, p: 'inactive_0'},
            {contextActive: true, p: 'active_1'},
            {contextActive: true, p: 'active_2'}
          ] 
        },
        'mock_expected_val'
      ],
      [
        [
          'should return context with expected value added to all active cases',
          (ctx) => {
            assert.equal(ctx.cases[1].p, 'active_1')
            assert.equal(ctx.cases[1].expectedValue, 'mock_expected_val')
            assert.equal(ctx.cases[2].p, 'active_2')
            assert.equal(ctx.cases[2].expectedValue, 'mock_expected_val')
          }
        ]
      ]
    ]

  ]],

  [context.setDescribeMessage, [

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
]

tests.forEach((test) => {

  const [testFn, cases] = test

  describe('context.' + testFn.name + '()', () => {

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