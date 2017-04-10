import { runFuncTest } from '../helpers'
import describeMessage from 'reducers/describeMessage'

const defaultDescribeTest = (arg) => { return arg }

runFuncTest(describeMessage, 'describeMessage() INIT', [
  {
    before: () => { describeMessage.__Rewire__('defaultDescribeTest', defaultDescribeTest) },
    after: () => { describeMessage.__ResetDependency__('defaultDescribeTest') },
    describe: 'when given a testFn but no describeMessage',
    should: 'should call defaultDescribeTest with testFn and return the result',
    args: [undefined, { type: 'INIT', testFn: 'mock_fn'}],
    expect: 'mock_fn'
  },
  {
    args: [undefined, { type: 'INIT', testFn: 'mock_fn', describeMessage: 'mock_describe_msg'}],
    expect: 'mock_describe_msg'
  }
])
