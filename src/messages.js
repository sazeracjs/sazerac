import { isFunction } from 'lodash'
import objectToMessageString from './objectToMessageString'

const defaultDescribeTest = (fn) => {
  if (isFunction(fn)) {
    if (fn.name) {
      return fn.name + '()'
    } else {
      return '[anonymous function]'
    }
  }
}

const defaultDescribeCase = (args = []) => {
  if (args.length > 0) {
    const formattedArgs = args.map((arg) => {
      return objectToMessageString(arg)
    })
    return 'when given ' + formattedArgs.join(' and ')
  } else {
    return 'when called'
  }
}

const defaultShouldMessage = (expectedValue) => {
  return 'should return ' + objectToMessageString(expectedValue)
}

export default { defaultDescribeTest, defaultDescribeCase, defaultShouldMessage }
export { defaultDescribeTest, defaultDescribeCase, defaultShouldMessage }
