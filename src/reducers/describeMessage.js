import Actions from './Actions'

export default (state, action) => {
  
  switch(action.type) {
    case Actions.INIT:
      return action.describeMessage || action.testFn.name + '()'
    default:
      return state
  }

}
