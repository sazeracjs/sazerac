Sazerac
=======

[![CircleCI](https://circleci.com/gh/mikec/sazerac/tree/master.svg?style=svg)](https://circleci.com/gh/mikec/sazerac/tree/master)

Data-driven unit testing for JavaScript.


About
-----

This module provides a simple but flexible way to create [data-driven tests](https://booker.codes/data-driven-tests-in-javascript-using-mocha/) in JavaScript. It works with the most popular JavaScript testing frameworks: [mocha](https://mochajs.org/), [jasmine](https://jasmine.github.io/), and [jest](https://facebook.github.io/jest/).


Getting Started
---------------

Install Sazerac as an npm module and save it to your `package.json` file as a development dependency:

```js
npm install sazerac --save-dev
```

Import the `test` and `given` helper functions into your project:

```js
import { test, given } from 'sazerac'
```


Why Use This?
-------------

Let's say you have a function `isPrime()`. When given a number, it returns `true` or `false` depending on whether the number is a prime number.

```js
function isPrime(num) {
  for(var i = 2; i < num; i++) {
    if(num % i === 0) return false;
  }
  return num > 1;
}
```

If you're using a framework like [jasmine](https://jasmine.github.io/), your tests might look something like this:

```js
describe('isPrime()', () => {

  describe('when given 2', () => {
    it('should return true', () => {
      assert.isTrue(isPrime(2))
    })
  })

  describe('when given 3', () => {
    it('should return true', () => {
      assert.isTrue(isPrime(3))
    })
  })

  describe('when given 4', () => {
    it('should return false', () => {
      assert.isFalse(isPrime(4))
    })
  })

  // and more ...

})
```

It's a lot of code to write for only 3 test cases and such a basic function!

The same tests can be defined with Sazerac as follows:

```js
test(isPrime, () => {
  given(2).expect(true)
  given(3).expect(true)
  given(4).expect(false)
})
```

Sazerac runs the `describe` and `it` functions needed for these test cases. It adds reporting messages in a consistent format based on the input and output parameters. For this example, the test report ends up looking like this:

```
isPrime()
  when given 2
    ✓ should return true
  when given 3
    ✓ should return true
  when given 4
    ✓ should return false
```

Usage
-----

`test()` sets the function you want to test. `given()` creates a test case by defining the arguments that will be passed to your function.

```js
test(mySumFunction, () => {
  var t = given(1, 2, 3)
})
```

The test case returned by `given` provides functions for defining your test case.

### .expect(returnValue)

Sets the expected return value for a test case. Uses `assert.deepEqual` from the [chai](http://chaijs.com/) assertion library.

```js
t.expect(6)
```

### .describe(message)

Sets a message for the reporter to describe the test case. This message will be passed to the `describe` function when the tests run.

```js
t.describe('when called with a set of numbers')
```

### .should(message)

Sets a message for the reporter to describe the test expectation. This message will be passed to the `it` function when the tests run.

```js
t.should('should return the sum of the numbers')
```

### .assert(message, assertFunction)

Adds an assertion for the test case. `message` describes this assertion, and will be passed to the `it` function when tests run. `assertFunction` is called with the actual return value of the executed test function.

```js
t.assert('should set the value of the sum property to 6', (actualReturnValue) => {
  // use any assertion library here
  assert.equal(actualReturnValue.sum, 6)
})
```

Multiple assertions can be added to a single test case

```js
t.assert('should set a sum property', (actualReturnValue) => {
  assert.hasProperty(actualReturnValue, 'sum')
}).assert('should set the value of the sum property to 6', (actualReturnValue) => {
  assert.equal(actualReturnValue.sum, 6)
})
```


Chaining
--------

All test case functions can be chained, in any order.

```js
test(mySumFunction, () => {
  given(1, 2, 3)
    .expect(6)
    .describe('when called with a set of numbers')
    .should('should return the sum of the numbers')
})
```


Grouping Multiple Cases
-----------------------

If you have multiple test case inputs with the same expected return value, they can be grouped with the `forCases(cases)` function:

```js
import { test, given, forCases } from 'sazerac'

test(isPrime, () => {
  const primes = [ given(2), given(3), given(5), given(7) ];
  const nonPrimes = [ given(1), given(4), given(6), given(8) ];
  forCases(primes).expect(true)
  forCases(nonPrimes).expect(false);
});
```

`forCases` returns an object with the same functions that can be applied to an individual test case: `expect`, `describe`, `should`, and `assert`


Message Formatting
------------------

### Default Format

Sazerac formats `describe` and `it` messages based on given parameters and the expected return value:

```js

test(myFunction, () => {
  given(1, 2, 3).expect(true)
})

/*

report output:

myFunction()
  when given 1, 2, and 3
    ✓ should return true

*/

```

### Custom Format

For custom formatted messages, sazerac uses [https://github.com/alexei/sprintf.js](https://github.com/alexei/sprintf.js).

Custom formatting can be applied to `.describe` messages using given parameters:

```js

test(addTwoNumbers, () => {
  given(2, 3).expect(5).describe('%s plus %s')
})

/*

report output:

addTwoNumbers()
  2 plus 3
    ✓ should return 5

*/

```

Same for `.should` messages, but expected value is used:

```js

test(addTwoNumbers, () => {
  given(2, 3).expect(5).describe('%s plus %s').should('equals %s')
})

/*

report output:

addTwoNumbers()
  2 plus 3
    ✓ equals 5

*/

```

