import { test } from '../src/main'
import errors from '../src/errors'
import { assert } from 'chai'

describe('test()', () => {

  describe('when the first argument is not a function', () => {
    it('should throw an expectedFunction error', () => {
      const notFnArg = 111
      const fn = () => {  test(notFnArg) }
      const errMsg = errors.expectedFunction('test', notFnArg)
      assert.throws(fn, Error, errMsg)
    })
  })

  describe('when the second argument is not a function', () => {
    it('should throw an expectedFunction error', () => {
      const notFnArg = 111
      const fn = () => {  test(() => { }, notFnArg) }
      const errMsg = errors.expectedFunction('test', notFnArg)
      assert.throws(fn, Error, errMsg)
    })
  })

})
