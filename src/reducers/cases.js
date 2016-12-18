import Actions from './Actions'

export default (state = [], action) => {

  switch(action.type) {
    
    case Actions.ADD_CASE:
      return state

    case Actions.ADD_EXPECTED_VALUE:
      return state

    default:
      return state

  }

}