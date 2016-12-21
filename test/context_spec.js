'use strict'

import context from '../src/context';
import { runTests } from './helpers'
import { assert } from 'chai';

function MockFn() { }

runTests([

  [context.lastCaseIndex, 'context.lastCaseIndex', [

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
