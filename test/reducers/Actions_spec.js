import { assert } from 'chai'
import { runTests } from '../helpers'
import { newAction } from '../../src/reducers/Actions'

runTests([

  [newAction, 'newAction', [

    [
      'given a type and no parameters', ['INIT'], [
        [
          'should return an object with type property set to the type',
          (ret) => {
            assert.propertyVal(ret, 'type', 'INIT')
          }
        ]
      ]
    ]
  ]]

])
