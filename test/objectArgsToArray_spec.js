import { assert } from 'chai'
import { runFuncTest } from './helpers'
import objectArgsToArray from '../src/objectArgsToArray'

runFuncTest(objectArgsToArray, 'objectArgsToArray', [
  {
    describe: 'when given an array of objects',
    should: 'should return the array of objects',
    args: [[{},{},{}]],
    expect: [{},{},{}]
  },
  {
    describe: 'when given an array where the first item is an array',
    should: 'should return the first item',
    args: [[[{},{},{}]]],
    expect: [{},{},{}]
  }
])
