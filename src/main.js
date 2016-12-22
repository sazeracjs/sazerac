import lastCaseIndex from './lastCaseIndex'
import { actions, listener } from './reducers/actions'
import describer from './describer'
import { newTestCase } from './testCase'

const frameworkFns = {
  describeFn: describe,
  itFn: it
}

let _state;

listener((state) => { _state = state })

const test = (testFn, definerFn) => {
  actions.init({ testFn })
  definerFn()
  describer(_state, frameworkFns)
}

const given = (...args) => {
  const state = actions.addCase({ args })
  const caseIndex = lastCaseIndex(state)
  return newTestCase(caseIndex)
}

export { test, given }
export default { test, given }
