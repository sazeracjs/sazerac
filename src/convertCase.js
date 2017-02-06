const convertCase = (str) => {
  return str.toLowerCase().replace(/_([a-z])/g, function (g) { return g[1].toUpperCase() })
}

export default convertCase
export { convertCase }
