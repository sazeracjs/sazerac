import isArray from 'lodash/isArray'

export default (objectArgs) => {
  if (isArray(objectArgs[0])) {
    return objectArgs[0]
  } else {
    return objectArgs
  }
}
