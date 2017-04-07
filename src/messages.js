import isFunction from 'lodash.isfunction'
import objectToMessageString from './objectToMessageString'

export const defaultDescribeTest = (fn) => {
  if (isFunction(fn)) {
    if (fn.name) {
      return fn.name + '()'
    } else {
      return '[anonymous function]'
    }
  }
}

export const defaultDescribeCase = (args = []) => {
  if (args.length > 0) {
    const formattedArgs = args.map((arg) => {
      return objectToMessageString(arg)
    })
    return 'when given ' + formattedArgs.join(' and ')
  } else {
    return 'when called'
  }
}

export const defaultShouldMessage = (expectedValue) => {
  return defaultMessage('should return', expectedValue)
}

export const defaultShouldThrowMessage = (expectedMessage) => {
  return defaultMessage('should throw error', expectedMessage)
}

const defaultMessage = (msgPrefix, msg) => {
  return `${msgPrefix} ${objectToMessageString(msg)}`
}

export default {
  defaultDescribeTest,
  defaultDescribeCase,
  defaultShouldMessage,
  defaultShouldThrowMessage
}
