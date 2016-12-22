import { actionTypes } from './actions'

export default (state, action) => {

  switch(action.type) {
    case actionTypes.INIT:
      return action.testFn
    default:
      return state
  }

}