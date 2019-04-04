import { test, given } from 'sazerac'
import { isPrime } from '../functions'

test(isPrime, function() {
  given(1).expect(false)
  given(2).expect(true)
  given(3).expect(true)
})
