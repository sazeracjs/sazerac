import { isString, isFunction } from 'lodash'

const defaultDescribeTest = (fn) => {
  if (isFunction(fn) && fn.name) {
    return fn.name + '()'
  }
}

const defaultDescribeCase = (args = []) => {
  if (args.length > 0) {
    const formattedArgs = args.map((arg) => {
      return formatString(arg)
    })
    return 'when given ' + formattedArgs.join(' and ')
  } else {
    return 'when called'
  }
}

const defaultShouldMessage = (expectedValue) => {
  return 'should return ' + formatString(expectedValue)
}

const formatString = (str) => {
  if (isString(str)) return "'" + str + "'"
  return str
}

export default { defaultDescribeTest, defaultDescribeCase, defaultShouldMessage }
export { defaultDescribeTest, defaultDescribeCase, defaultShouldMessage }
