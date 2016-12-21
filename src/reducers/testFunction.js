import actions from './actions'

export default (state, action) => {

  switch(action.type) {
    case actions.INIT:
      return action.testFn
    default:
      return state
  }

}