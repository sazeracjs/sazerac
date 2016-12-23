import { concat } from 'lodash'
import { actionTypes } from './actions'

export default (state = [], action) => {
  
  switch(action.type) {

    case actionTypes.ADD_CASE_ASSERTION:
      return concat(state, {
        caseIndex: action.caseIndex,
        shouldMessage: action.message,
        assertFn: action.assertFn
      })

    case actionTypes.INIT:
      return []

    default:
      return state

  }

}
