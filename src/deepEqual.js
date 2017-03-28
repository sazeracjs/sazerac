import deepEql from 'deep-eql'
import { TestCaseError } from './errors'

export const deepEqual = (actualValue, expectedValue) => {
  if(!deepEql(actualValue, expectedValue)) {
    throw TestCaseError(expectedValue, actualValue)
  }
}

export default deepEqual
