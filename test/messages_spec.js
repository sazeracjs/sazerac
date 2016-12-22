import messages from '../src/messages';
import { runTests } from './helpers'
import { assert } from 'chai';

function mockFunc() {}

runTests([

  [messages.defaultDescribeTest, 'messages.defaultDescribeTest', [

    [
      'when given a function',
      [mockFunc],
      [[
          'should return the function name with parentheses',
          (ret) => { assert.equal(ret, 'mockFunc()') }
      ]]
    ],

    [
      'when given undefined',
      [undefined],
      [[
          'should return undefined',
          (ret) => { assert.isUndefined(ret) }
      ]]
    ],

    [
      'when given a non-function',
      [27],
      [[
          'should return undefined',
          (ret) => { assert.isUndefined(ret) }
      ]]
    ]

  ]],

  [messages.defaultDescribeCase, 'messages.defaultDescribeCase', [

    [
      'when given an array of strings',
      [['one', 'two']],
      [
        [
          'should return a message with quoted strings as input params',
          (ret) => {
            assert.equal(ret, "when given 'one' and 'two'")
          }
        ]
      ]
    ],

    [
      'when given an array of integers',
      [[1, 2]],
      [
        [
          'should return a message with non quoted values',
          (ret) => {
            assert.equal(ret, "when given 1 and 2")
          }
        ]
      ]
    ],

    [
      'when given an empty array',
      [[]],
      [
        [
          'should return a message with no values',
          (ret) => {
            assert.equal(ret, "when called")
          }
        ]
      ]
    ]

  ]],

  [messages.defaultShouldMessage, 'messages.defaultShouldMessage', [

    [
      'when given a string value',
      ['one'],
      [
        [
          'should return a message with the string value quoted',
          (ret) => {
            assert.equal(ret, "should return 'one'")
          }
        ]
      ]
    ],

    [
      'when given an integer value',
      [1],
      [
        [
          'should return a message with non quoted value',
          (ret) => {
            assert.equal(ret, "should return 1")
          }
        ]
      ]
    ]

  ]]

])