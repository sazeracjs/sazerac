export default (objectArgs) => {
  if (Array.isArray(objectArgs[0])) {
    return objectArgs[0]
  } else {
    return objectArgs
  }
}
