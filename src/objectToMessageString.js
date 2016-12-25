import { isString, isObject, isUndefined } from 'lodash'

export default (o) => {
  if (isUndefined(o)) return 'undefined'
  if (isString(o)) return "'" + o + "'"
  else if (isObject) return JSON.stringify(o)
  return o
}
