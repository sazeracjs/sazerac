<p align="center">
  <a href="https://sazeracjs.org" target="_blank"><img width="50" src="http://sazeracjs.com/images/logo.svg"></a>
</p>

<p align="center">
  <a href="https://circleci.com/gh/mikec/sazerac/tree/master"><img src="https://circleci.com/gh/mikec/sazerac/tree/master.svg?style=svg" /></a>
</p>

Sazerac
=======

Data-driven unit testing for JavaScript.


About
-----

Sazerac is a library for [data-driven testing](https://hackernoon.com/sazerac-data-driven-testing-for-javascript-e3408ac29d8c#.xppc8jjvo) in JavaScript. It works with [mocha](https://mochajs.org/), [jasmine](https://jasmine.github.io/), and [jest](https://facebook.github.io/jest/). Using Sazerac, and the data-driven testing pattern in general, will reduce the complexity and increase readability of your test code.

Check out [sazeracjs.com](http://sazeracjs.com) for docs and [sazerac-example](https://github.com/mikec/sazerac-example) for examples.


Why Use It?
-----------

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


Installation
------------

Install Sazerac as an npm module and save it to your `package.json` file as a development dependency:

```js
npm install sazerac --save-dev
```

Import the `test` and `given` helper functions into your project:

```js
import { test, given } from 'sazerac'
```

Guide and API documentation
---------------------------

Visit [sazeracjs.com](http://sazeracjs.com)

Contributing
------------

Yes, please do :)

Get In Touch
------------

[@MikeCalvanese](https://twitter.com/MikeCalvanese)
