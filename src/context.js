const lastCaseIndex = (ctx) => {
  if (ctx && ctx.cases && ctx.cases.length > 0) {
    return ctx.cases.length - 1;
  }
}

export { lastCaseIndex }
export default { lastCaseIndex }
