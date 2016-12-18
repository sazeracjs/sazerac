import Actions from './Actions'

export default (state, action) => {

  switch(action.type) {
    case Actions.INIT:
      return action.fn
    default:
      return state
  }

}