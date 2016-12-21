import { isString } from 'lodash'

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

export default { defaultDescribeCase, defaultShouldMessage }
export { defaultDescribeCase, defaultShouldMessage }
