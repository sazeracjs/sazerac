import actions from './actions'
import { defaultDescribeTest } from '../messages'

export default (state, action) => {
  
  switch(action.type) {
    case actions.INIT:
      return action.describeMessage || defaultDescribeTest(action.testFn)
    default:
      return state
  }

}
