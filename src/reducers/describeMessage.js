import Actions from './Actions'

export default (state, action) => {
  
  switch(action.type) {
    case Actions.INIT:
      return action.describeMessage || action.fn.name + '()'
    default:
      return state
  }

}
