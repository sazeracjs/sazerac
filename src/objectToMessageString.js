import isString from 'lodash/isString'
import isObject from 'lodash/isObject'
import isUndefined from 'lodash/isUndefined'

export default (o) => {
  if (isUndefined(o)) return 'undefined'
  if (isString(o)) return '\'' + o + '\''
  else if (isObject) return JSON.stringify(o)
  return o
}
