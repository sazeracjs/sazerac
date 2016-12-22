import { assert } from 'chai'
import { runTests } from '../helpers'
import describeMessage from '../../src/reducers/describeMessage'

const defaultDescribeTest = (arg) => { return arg }

runTests([

  [describeMessage, 'describeMessage', [

    [
      'when given action.type=INIT, action.testFn, and no action.describeMessage',
      [undefined, { type: 'INIT', testFn: 'mock_fn'}],
      {
        before: () => { describeMessage.__Rewire__('defaultDescribeTest', defaultDescribeTest) },
        after: () => { describeMessage.__ResetDependency__('defaultDescribeTest') }
      },
      [
        [
          'should pass testFn to defaultDescribeTest and return the result',
          (ret) => { assert.equal(ret, 'mock_fn') }
        ]
      ]
    ],

    [
      'when given action.type=INIT, action.testFn, and action.describeMessage',
      [undefined, { type: 'INIT', testFn: 'mock_fn', describeMessage: 'mock_describe_msg'}],
      [
        [
          'should return the describeMessage',
          (ret) => { assert.equal(ret, 'mock_describe_msg') }
        ]
      ]
    ]

  ]]

])
