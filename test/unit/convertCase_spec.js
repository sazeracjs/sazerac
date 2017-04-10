import convertCase from 'convertCase'
import { runTests } from './helpers'
import { assert } from 'chai'

runTests([

  [convertCase, 'convertCase', [

    [
      'when given string with no underscores',
      ['ONE'],
      [
        [
          'should return the string in lowercase',
          (ret) => { assert.equal(ret, 'one') }
        ]
      ]
    ],

    [
      'when given string with underscores',
      ['ONE_TWO_THREE'],
      [
        [
          'should return the string in camelCase',
          (ret) => { assert.equal(ret, 'oneTwoThree') }
        ]
      ]
    ]

  ]]

])
