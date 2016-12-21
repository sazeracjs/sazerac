import { concat, toArray } from 'lodash'
import Actions from './Actions'
import { defaultDescribeCase } from '../messages'

export default (state = [], action) => {

  switch(action.type) {
    
    case Actions.ADD_CASE:
      const inputParams = toArray(action.args)
      return concat(state, {
        inputParams: inputParams,
        describeMessage: defaultDescribeCase(inputParams)
      })

    case Actions.ADD_EXPECTED_VALUE:
      return state

    default:
      return state

  }

}