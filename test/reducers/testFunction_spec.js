import { assert } from 'chai'
import { runTests } from '../helpers'
import testFunction from '../../src/reducers/testFunction'

runTests([

  [testFunction, 'testFunction', [

    [
      'when given action.type=INIT, and action.testFn',
      [undefined, { type: 'INIT', testFn: 'test_fn'}],
      [
        [
          'should return action.testFn',
          (ret) => { assert.equal(ret, 'test_fn') }
        ]
      ]
    ]

  ]]

])
