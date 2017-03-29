import isString from 'lodash.isstring'
import isObject from 'lodash.isobject'
import isUndefined from 'lodash.isundefined'

export default (o) => {
  if (isUndefined(o)) return 'undefined'
  if (isString(o)) return '\'' + o + '\''
  else if (isObject) return JSON.stringify(o)
  return o
}
