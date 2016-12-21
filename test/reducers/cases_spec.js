import { assert } from 'chai'
import { runTests } from '../helpers'
import cases from '../../src/reducers/cases'

cases.__Rewire__('defaultDescribeCase', (args) => { return JSON.stringify(args) })

runTests([

  [cases, 'cases', [

    [
      'when given an undefined state, an action with type:ADD_CASE, and an args array',
      [undefined, { type: 'ADD_CASE', args: ['one', 'two'] }],
      [
        [
          'should return an array with one object',
          (ret) => { assert.equal(ret.length, 1) }
        ],
        [
          'should return an array with one object with inputParams set',
          (ret) => {
            assert.deepPropertyVal(ret, '[0].inputParams[0]', 'one')
            assert.deepPropertyVal(ret, '[0].inputParams[1]', 'two')
          }
        ],
        [
          'should return an array with one object with describeMessage set',
          (ret) => {
            assert.deepProperty(ret, '[0].describeMessage')
          }
        ],
        [
          'should have called defaultDescribeCase with inputParams',
          (ret) => {
            assert.deepPropertyVal(ret, '[0].describeMessage', '["one","two"]')
          }
        ]
      ]
    ],

    [
      'when given a populated array, an action with type:ADD_CASE, and an args array',
      [['obj'], { type: 'ADD_CASE', args: ['one', 'two'] }],
      [
        [
          'should return an array with new case added',
          (ret) => {
            assert.equal(ret.length, 2)
            assert.deepPropertyVal(ret, '[1].inputParams[0]', 'one')
            assert.deepPropertyVal(ret, '[1].inputParams[1]', 'two')
          }
        ]
      ]
    ],

    [
      'when given an action with type:ADD_CASE and an args array-like object',
      [undefined, { type: 'ADD_CASE', args: {'0':'one', '1':'two'} }],
      [
        [
          'should have called defaultDescribeCase with an array converted from the array-like object',
          (ret) => {
            assert.deepPropertyVal(ret, '[0].describeMessage', '["one","two"]')
          }
        ]
      ]
    ]

  ]]

])
