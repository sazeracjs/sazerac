import { newTestCase, __RewireAPI as testCaseRewireAPI } from '../src/testCase';
import { runTests } from './helpers'
import { assert } from 'chai';
import sinon from 'sinon'

const doAction = () => {}

runTests([

  [newTestCase, 'newTestCase', [

    [
      'when given a caseIndex',
      [27],
      [
        [
          'should return a new testCase with ___caseIndex set to the case index',
          (ret) => { assert.propertyVal(ret, '___caseIndex', 27) }
        ]
      ]
    ]

  ]]

])

describe('testCase', () => {

  beforeEach(() => {
    this.testCase = newTestCase(222)
    //testCaseRewireAPI.__Rewire__('doAction')
    //sinon.spy()
  })

  describe('.expect()', () => {

  })

  describe('.describe()', () => {
    
  })

})
