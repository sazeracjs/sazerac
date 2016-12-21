import { assert } from 'chai'
import { runTests } from '../helpers'
import state from '../../src/reducers/state'

function MockFn() { }

runTests([

  [state, 'state', [

    [
      'when given an undefined state, an action with type:INIT, and an fn param',
      [undefined, { type: 'INIT', fn: MockFn}],
      [
        [
          'should return state with a testFunction property set to the function',
          (ret) => { assert.equal(ret.testFunction, MockFn) }
        ],
        [
          'should return state with a cases property set to an empty array',
          (ret) => { assert.deepEqual(ret.cases, []) }
        ],
        [
          'should return state with a describe property set to the function name',
          (ret) => { assert.equal(ret.describeMessage, 'MockFn()') }
        ]
      ]
    ],

    [
      'when given an undefined state, an action with type:INIT, an fn param, and a describeMessage',
      [undefined, { type: 'INIT', fn: MockFn, describeMessage: 'mock_describe_msg'}],
      [
        [
          'should return state with a describe property set to the describe message param',
          (ret) => { assert.equal(ret.describeMessage, 'mock_describe_msg') }
        ]
      ]
    ]

  ]]

])
