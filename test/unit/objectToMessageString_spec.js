import { runFuncTest } from './helpers'
import objectToMessageString from 'objectToMessageString'

runFuncTest(objectToMessageString, 'objectToMessageString', [
  {
    describe: 'when given a string',
    should: 'should return the string in quotes',
    args: ['mock_str'],
    expect: '\'mock_str\''
  }, 
  {
    describe: 'when given a number',
    should: 'should return the number as a string',
    args: [27],
    expect: '27'
  }, 
  {
    describe: 'when given an object',
    should: 'should return the stringified object',
    args: [{ prop: '999' }],
    expect: '{"prop":"999"}'
  }, 
  {
    describe: 'when given null',
    should: 'should return the string \'null\'',
    args: [null],
    expect: 'null'
  }, 
  {
    describe: 'when given undefined',
    should: 'should return the string \'undefined\'',
    args: [undefined],
    expect: 'undefined'
  }
])
