import objectToMessageString from './objectToMessageString'

const baseMessage = (fnName) => {
  return 'call to `' + fnName + '()` failed. '
}

const expectedFunction = (fnName, fnArg) => {
  return baseMessage(fnName) + 'expected ' + 
    objectToMessageString(fnArg) + ' to be a function'
}

export default { expectedFunction }
