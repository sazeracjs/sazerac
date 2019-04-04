import lastCaseIndex from 'lastCaseIndex'
import { runTests } from './helpers'
import { assert } from 'chai'

runTests([

  [lastCaseIndex, 'lastCaseIndex', [

    [
      'when given a context with no cases',
      [{ cases: [] }],
      [
        [
          'should return undefined',
          (ret) => {
            assert.isUndefined(ret)
          }
        ]
      ]
    ],

    [
      'when given a context with cases',
      [{ cases: [{},{},{}] }],
      [
        [
          'should return the index of the last case',
          (ret) => {
            assert.equal(ret, 2)
          }
        ]
      ]
    ]

  ]]

])
