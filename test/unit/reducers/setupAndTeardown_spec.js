import { assert } from 'chai'
import { runTests } from '../helpers'
import setupAndTeardown, { setupAndTeardownTypes } from 'reducers/setupAndTeardown'

runTests([

  [setupAndTeardown, 'setupAndTeardown() ADD_CASE_BEFORE_FN', [

    [
      'when given empty array state and setupAndTeardown.BEFORE',
      [
        [],
        setupAndTeardownTypes.BEFORE,
        { type: 'ADD_CASE_BEFORE_FN', caseIndex: 0, beforeFn: 'mock_before_fn' }
      ],
      [
        [
          'should return an array with one item added',
          (ret) => { assert.propertyVal(ret, 'length', 1) }
        ],
        [
          'should return an array with beforeFn set on the first item',
          (ret) => { assert.deepPropertyVal(ret, '[0].beforeFn', 'mock_before_fn') }
        ]
      ]
    ],

    [
      'when given setupAndTeardown.AFTER',
      [
        ['mock_existing'],
        setupAndTeardownTypes.AFTER,
        { type: 'ADD_CASE_BEFORE_FN', caseIndex: 0, beforeFn: 'mock_before_fn' }
      ],
      [
        [
          'should return the existing state',
          (ret) => { assert.deepEqual(ret, ['mock_existing']) }
        ]
      ]
    ]

  ]],

  [setupAndTeardown, 'setupAndTeardown() ADD_CASE_AFTER_FN', [

    [
      'when given empty array state and setupAndTeardown.AFTER',
      [
        [],
        setupAndTeardownTypes.AFTER,
        { type: 'ADD_CASE_AFTER_FN', caseIndex: 0, afterFn: 'mock_after_fn' }
      ],
      [
        [
          'should return an array with one item added',
          (ret) => { assert.propertyVal(ret, 'length', 1) }
        ],
        [
          'should return an array with afterFn set on the first item',
          (ret) => { assert.deepPropertyVal(ret, '[0].afterFn', 'mock_after_fn') }
        ]
      ]
    ],

    [
      'when given setupAndTeardown.BEFORE',
      [
        ['mock_existing'],
        setupAndTeardownTypes.BEFORE,
        { type: 'ADD_CASE_AFTER_FN', caseIndex: 0, afternFn: 'mock_after_fn' }
      ],
      [
        [
          'should return the existing state',
          (ret) => { assert.deepEqual(ret, ['mock_existing']) }
        ]
      ]
    ]

  ]]

])