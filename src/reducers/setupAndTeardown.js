import concat from 'lodash.concat'
import { actionTypes } from './actions'

export const setupAndTeardownTypes = {
  BEFORE: 'before',
  AFTER: 'after'
}

export default (state = [], type, action) => {

  switch(action.type) {

    case actionTypes.ADD_CASE_BEFORE_FN:
      switch (type) {
        case setupAndTeardownTypes.BEFORE:
          return concat(state, {
            caseIndex: action.caseIndex,
            beforeFn: action.beforeFn
          })
        default:
          return state
      }

    case actionTypes.ADD_CASE_AFTER_FN:
      switch (type) {
        case setupAndTeardownTypes.AFTER:
          return concat(state, {
            caseIndex: action.caseIndex,
            afterFn: action.afterFn
          })
        default:
          return state
      }

    case actionTypes.INIT:
      return []

    default:
      return state

  }

}
