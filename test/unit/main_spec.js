import { test } from 'main'
import errors from 'errors'
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
