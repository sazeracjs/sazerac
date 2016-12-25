import { assert } from 'chai'
import { runFuncTest } from '../helpers'
import testFunction from '../../src/reducers/testFunction'

runFuncTest(testFunction, 'testFunction() INIT', [
  {
    args: [undefined, { type: 'INIT', testFn: 'test_fn'}],
    expect: 'test_fn'
  }
])
