import { test, given, forCases } from 'sazerac'
import { assert } from 'chai'
import { isPrime } from '../functions'

test(isPrime, function() {
  given(1).expect(false)
  given(2).expect(true)
  given(3).expect(true)
})
