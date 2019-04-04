import objectToMessageString from './objectToMessageString'

const baseMessage = (fnName) => {
  return 'call to `' + fnName + '()` failed. '
}

export const expectedFunction = (fnName, fnArg) => {
  return baseMessage(fnName) + 'expected ' +
    objectToMessageString(fnArg) + ' to be a function'
}

export const TestCaseError = (expected, actual) => {
  const actualStr = objectToMessageString(actual)
  const expectedStr = objectToMessageString(expected)
  const msg = `Test case failed: expected ${expectedStr} to equal ${actualStr}`
  return new Error(msg)
}

export default { expectedFunction, TestCaseError }
