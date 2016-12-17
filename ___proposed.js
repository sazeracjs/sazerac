import sz from 'sazerac';

//.test({function_to_test})
sz.test(addTwoNumbers) 
  //.case({arguments}, {expected_return_value}): defines a data-driven test case
  .given(1, 1).expect(2)     
  .given(2, 56).expect(58)
  .given(3, -5).expect(-2)
  .given(-4, -6).expect(-10)
  //.describeAll({message}): defines a describe message for all cases in the chain
  .all.describe('when %s is added to %s')
  //.shouldAll({message}): defines a should message for all cases in the chain
  .all.should('should return %s')
  .run();
  // use https://github.com/alexei/sprintf.js for formatting
  // describe messages are given the case input params as context for string formatting
  // should messages are given the case expected output as context for string formatting

/*
 * runs these tests
 *
 * addTwoNumbers()
 *    when 1 is added to 1
 *      should return 2
 *    when 2 is added to 56
 *      should return 58
 *    when 3 is added to -5
 *      should return -2
 *    when -4 is added to -6
 *      should return -10
 *
 */

sz.test(isPrime)
  .given(1).expect(true)
  //.describe() and .should() set the describe and should message for an individual test case
  .given(2).expect(false).describe('given a number').should('should do something')
  .given(3).expect(true)
  .given(4).expect(false)
  .all.describe('given %s')
  .all.should('should return %s');

/*
 * runs these tests
 *
 * isPrime()
 *    given 1
 *      should return true
 *    given a number
 *      should do something
 *    given 3
 *      should return true
 *    given 4
 *      should return false
 *
 */

sz.test(getMessage)
  .given({ type: 'sms' }) // case 0
  .given({ type: 'snapchat' }) // case 1
    //.assert({assertFunc}) runs an assertion on an individual test case
    .assert(
      (message) => { assert.isDefined(message.image) },
      'should return a message with an image'
    )
    .assert(
      (message) => { assert.isDefined(message.username) },
      'should return a message with a username'
    )
  .given({ type: 'email' }) // case 2
    .assert(
      (message) => { assert.isDefined(message.subject),
      'should return a message with a subject'
    )
  //.assertAll({assertFunc}) runs an assertion on all test cases in the chain
  .all.assert(
    (message) => { assert.isDefined(message.body) },
    'should return a message with a body'
  )
  .all.assert(
    (message) => { assert.isDefined(message.wordCount) },
    'should return a message with a wordCount'
  )
  //.forCases(...{case_indeces}) re-sets the chain context
  .for(0, 1)
    .assert(
      (message) => { assert.isUndefined(message.subject),
      'should return a message without a subject'
    )
    .assert(
      (message) => { assert.isTrue(message.isMobileOnly) },
      'should return a message with isMobileOnly set to true '
    )
  .all.describe('given type `%(type)s`');

/*
 * runs these tests
 *
 * getMessage()
 *    given type `sms`
 *      should return a message with a body
 *      should return a message with a wordCount
 *      should return a message without a subject
 *      should return a message with isMobileOnly set to true
 *    given type `snapchat`
 *      should return a message with an image
 *      should return a message with a username
 *      should return a message with a body
 *      should return a message with a wordCount
 *      should return a message without a subject
 *      should return a message with isMobileOnly set to true
 *    given type `email`
 *      should return a message with a subject
 *      should return a message with a body
 *      should return a message with a wordCount
 *
 */

