import { at, concat, filter, forEach, isArray, isFunction, isObject, isString, isUndefined, map, toArray } from 'lodash';
import { vsprintf } from 'sprintf-js';
import { assert } from 'chai';

var objectToMessageString = (function (o) {
  if (isUndefined(o)) return 'undefined';
  if (isString(o)) return "'" + o + "'";else if (isObject) return JSON.stringify(o);
  return o;
});

var baseMessage = function baseMessage(fnName) {
  return 'call to `' + fnName + '()` failed. ';
};

var expectedFunction = function expectedFunction(fnName, fnArg) {
  return baseMessage(fnName) + 'expected ' + objectToMessageString(fnArg) + ' to be a function';
};

var errors = { expectedFunction: expectedFunction };

var lastCaseIndex = function lastCaseIndex(ctx) {
  if (ctx && ctx.cases && ctx.cases.length > 0) {
    return ctx.cases.length - 1;
  }
};

var convertCase = function convertCase(str) {
  return str.toLowerCase().replace(/_([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
};

var defaultDescribeTest = function defaultDescribeTest(fn) {
  if (isFunction(fn)) {
    if (fn.name) {
      return fn.name + '()';
    } else {
      return '[anonymous function]';
    }
  }
};

var defaultDescribeCase = function defaultDescribeCase() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  if (args.length > 0) {
    var formattedArgs = args.map(function (arg) {
      return objectToMessageString(arg);
    });
    return 'when given ' + formattedArgs.join(' and ');
  } else {
    return 'when called';
  }
};

var defaultShouldMessage = function defaultShouldMessage(expectedValue) {
  return 'should return ' + objectToMessageString(expectedValue);
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var updateCase = function updateCase(cases, caseIndex, fn) {
  return map(cases, function (tCase, i) {
    if (caseIndex === i) {
      return fn(tCase);
    }
    return tCase;
  });
};

var setCaseProps = function setCaseProps(state, caseIndex, props) {
  return updateCase(state, caseIndex, function (tCase) {
    return _extends({}, tCase, props);
  });
};

var getCaseProp = function getCaseProp(state, caseIndex, prop) {
  return at(state, '[' + caseIndex + '].' + prop)[0];
};

var cases = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];
  var caseIndex = action.caseIndex;


  switch (action.type) {

    case actionTypes.ADD_CASE:
      var inputParams = toArray(action.args);
      return concat(state, {
        inputParams: inputParams,
        describeMessage: defaultDescribeCase(inputParams)
      });

    case actionTypes.SET_CASE_EXPECTED_VALUE:
      var shouldMsg = getCaseProp(state, caseIndex, 'shouldMessage');
      var tst = shouldMsg ? vsprintf(shouldMsg, [action.expectedValue]) : defaultShouldMessage(action.expectedValue);
      return setCaseProps(state, caseIndex, {
        expectedValue: action.expectedValue,
        shouldMessage: shouldMsg ? vsprintf(shouldMsg, [action.expectedValue]) : defaultShouldMessage(action.expectedValue)
      });

    case actionTypes.SET_CASE_DESCRIBE_MESSAGE:
      var args = getCaseProp(state, caseIndex, 'inputParams');
      var describeMsg = args && args.length > 0 ? vsprintf(action.message, args) : action.message;
      return setCaseProps(state, caseIndex, { describeMessage: describeMsg });

    case actionTypes.SET_CASE_SHOULD_MESSAGE:
      var expectedVal = getCaseProp(state, caseIndex, 'expectedValue');
      var msg = !isUndefined(expectedVal) ? vsprintf(action.message, [expectedVal]) : action.message;
      return setCaseProps(state, caseIndex, { shouldMessage: msg });

    case actionTypes.INIT:
      return [];

    default:
      return state;

  }
});

var caseAssertions = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];


  switch (action.type) {

    case actionTypes.ADD_CASE_ASSERTION:
      return concat(state, {
        caseIndex: action.caseIndex,
        shouldMessage: action.message,
        assertFn: action.assertFn
      });

    case actionTypes.INIT:
      return [];

    default:
      return state;

  }
});

var describeMessage = (function (state, action) {

  switch (action.type) {
    case actionTypes.INIT:
      return action.describeMessage || defaultDescribeTest(action.testFn);
    default:
      return state;
  }
});

var testFunction = (function (state, action) {

  switch (action.type) {
    case actionTypes.INIT:
      return action.testFn;
    default:
      return state;
  }
});

var store = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  return {
    testFunction: testFunction(state.testFunction, action),
    cases: cases(state.cases, action),
    caseAssertions: caseAssertions(state.caseAssertions, action),
    describeMessage: describeMessage(state.describeMessage, action)
  };
});

var actions = {};
var actionTypes = {};
var state = {};
var listenerFns = [];

var actionsArray = ['INIT', 'ADD_CASE', 'SET_CASE_EXPECTED_VALUE', 'SET_CASE_DESCRIBE_MESSAGE', 'SET_CASE_SHOULD_MESSAGE', 'ADD_CASE_ASSERTION'];

actionsArray.forEach(function (action) {
  actions[convertCase(action)] = function (params) {
    return doAction(action, params);
  };
  actionTypes[action] = action;
});

var doAction = function doAction(type, params) {
  state = store(state, _extends({ type: type }, params));
  listenerFns.forEach(function (fn) {
    fn(state);
  });
  return state;
};

var listener = function listener(fn) {
  if (isFunction(fn)) {
    listenerFns.push(fn);
  } else {
    throw new Error('invalid listener. ' + fn + ' is not a function');
  }
};

var describer = function describer(context, frameworkFunctions) {
  executeDescribers(buildDescriberDefinition(context, frameworkFunctions));
};

var executeDescribers = function executeDescribers(def) {
  var func = def.func,
      message = def.message,
      calls = def.calls,
      test = def.test;

  func(message, function () {
    if (test) {
      var testFn = test.testFn,
          inputParams = test.inputParams,
          expectedValue = test.expectedValue,
          assertFn = test.assertFn;

      if (expectedValue) {
        testExecuter(testFn, inputParams, expectedValue);
      } else if (assertFn) {
        assertionExecuter(testFn, inputParams, assertFn);
      }
    } else {
      forEach(calls, function (call) {
        executeDescribers(call);
      });
    }
  });
};

var testExecuter = function testExecuter(testFn, inputParams, expectedValue) {
  var actualVal = testFn.apply(null, inputParams);
  assert.deepEqual(actualVal, expectedValue);
};

var assertionExecuter = function assertionExecuter(testFn, inputParams, assertFn) {
  var actualVal = testFn.apply(null, inputParams);
  assertFn(actualVal);
};

var buildDescriberDefinition = function buildDescriberDefinition(context, frameworkFunctions) {
  var describeFn = frameworkFunctions.describeFn;
  var describeMessage = context.describeMessage;

  return {
    func: describeFn,
    message: describeMessage,
    calls: getCaseDescriberCalls(context, frameworkFunctions)
  };
};

var getCaseDescriberCalls = function getCaseDescriberCalls(context, frameworkFunctions) {
  var testFunction = context.testFunction,
      cases = context.cases,
      caseAssertions = context.caseAssertions;

  return map(cases, function (tCase, caseIndex) {
    var assertions = filter(caseAssertions, ['caseIndex', caseIndex]);
    return getCaseDescriberDef(tCase, frameworkFunctions, testFunction, assertions);
  });
};

var getCaseDescriberDef = function getCaseDescriberDef(tCase, frameworkFunctions, testFn, assertions) {
  var describeFn = frameworkFunctions.describeFn,
      itFn = frameworkFunctions.itFn;

  return {
    func: describeFn,
    message: tCase.describeMessage,
    calls: getCaseItCalls(tCase, itFn, testFn, assertions)
  };
};

var getCaseItCalls = function getCaseItCalls(tCase, itFn, testFn, assertions) {
  var shouldMessage = tCase.shouldMessage,
      inputParams = tCase.inputParams,
      expectedValue = tCase.expectedValue;

  var calls = [];
  if (!isUndefined(expectedValue)) {
    calls.push({
      func: itFn,
      message: shouldMessage,
      test: { testFn: testFn, inputParams: inputParams, expectedValue: expectedValue }
    });
  }
  if (assertions) {
    assertions.forEach(function (assertion) {
      var assertFn = assertion.assertFn;

      calls.push({
        func: itFn,
        message: assertion.shouldMessage,
        test: { testFn: testFn, inputParams: inputParams, assertFn: assertFn }
      });
    });
  }
  return calls;
};

/** Creates a new test case object */
var newTestCase = function newTestCase(caseIndex) {
  return {
    ___caseIndex: caseIndex,

    /**
     * Defines the expected return value for this test case. 
     * Uses http://chaijs.com, assert.deepEqual() to assert
     * that the expected return value equals the actual
     * return value.
     * 
     * @param {object} expectedValue - The expected return value
     *
     * @returns {object} A test case object
     */
    expect: testCaseFn(caseIndex, 'setCaseExpectedValue', 'expectedValue'),

    /**
     * Defines the "describe" message for this test case.
     * 
     * @param {string} message
     *
     * @returns {object} A test case object
     */
    describe: testCaseFn(caseIndex, 'setCaseDescribeMessage', 'message'),

    /**
     * Defines the "should" message for this test case. This is
     * passed to the `it` function when executing the test.
     * 
     * @param {string} message
     *
     * @returns {object} A test case object
     */
    should: testCaseFn(caseIndex, 'setCaseShouldMessage', 'message'),

    /**
     * Defines a custom assertion function for this test case
     * 
     * @param {string} message - A message describing the assertion
     * @param {function} assertFn - The custom assert function. Receives
     *                              the actual return value of the function
     *                              being tested as its only argument
     *
     * @returns {object} A test case object
     */
    assert: testCaseFn(caseIndex, 'addCaseAssertion', ['message', 'assertFn'])
  };
};

var testCaseFn = function testCaseFn(caseIndex, action, paramNames) {
  paramNames = isArray(paramNames) ? paramNames : [paramNames];
  return function () {
    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    var actionArgs = { caseIndex: caseIndex };
    paramNames.forEach(function (n, i) {
      actionArgs[n] = params[i];
    });
    actions[action](actionArgs);
    return newTestCase(caseIndex);
  };
};

var objectArgsToArray = (function (objectArgs) {
  if (isArray(objectArgs[0])) {
    return objectArgs[0];
  } else {
    return objectArgs;
  }
});

var newTestCaseCollection = function newTestCaseCollection(testCases) {

  testCases = objectArgsToArray(testCases);

  return {

    /**
     * Defines the expected return value for all test cases in
     * the collection. Calls expect() on each test case.
     * 
     * @param {object} expectedValue - The expected return value
     *
     * @returns {object} A test case collection object
     */
    expect: collectionFn(testCases, 'expect'),

    /**
     * Defines the "describe" message for all test cases in the
     * collection. Calls describe() on each test case.
     * 
     * @param {string} message
     *
     * @returns {object} A test case collection object
     */
    describe: collectionFn(testCases, 'describe'),

    /**
     * Defines the "should" message for all test cases in the
     * collection. Calls should() on each test case.
     * 
     * @param {string} message
     *
     * @returns {object} A test case collection object
     */
    should: collectionFn(testCases, 'should'),

    /**
     * Defines a custom assertion function for all test cases in
     * the collection. Calls assert() on each test case.
     * 
     * @param {string} message - A message describing the assertion
     * @param {function} assertFn - The custom assert function
     *
     * @returns {object} A test case collection object
     */
    assert: collectionFn(testCases, 'assert')
  };
};

var collectionFn = function collectionFn(testCases, fnName) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    forEach(testCases, function (testCase) {
      testCase[fnName].apply(null, args);
    });
    return newTestCaseCollection(testCases);
  };
};

var frameworkFns = {
  describeFn: describe,
  itFn: it
};

var _state = void 0;

listener(function (state) {
  _state = state;
});

/**
 * Defines test cases for a function
 *
 * @param {function} testFn - The function to test
 * @param {function} definerFn - The function that defines test cases for `testFn`
 */
var test = function test(testFn, definerFn) {
  if (!isFunction(testFn)) throw new Error(errors.expectedFunction('test', testFn));
  if (!isFunction(definerFn)) throw new Error(errors.expectedFunction('test', definerFn));
  actions.init({ testFn: testFn });
  definerFn();
  describer(_state, frameworkFns);
};

/**
 * Defines the given functional arguments for a test case
 *
 * @param {...object} args - The arguments that will be passed to the function being
 *                           tested
 *
 * @returns {object} A test case object
 */
var given = function given() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var state = actions.addCase({ args: args });
  var caseIndex = lastCaseIndex(state);
  return newTestCase(caseIndex);
};

/**
 * Groups multiple test case objects into a collection
 *
 * @param {...object} testCases - The test case objects to group. Accepts an array or 
 *                                a series of arguments
 *
 * @returns {object} A test case collection object
 */
var forCases = function forCases() {
  for (var _len2 = arguments.length, testCases = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    testCases[_key2] = arguments[_key2];
  }

  return newTestCaseCollection(testCases);
};

var main = { test: test, given: given, forCases: forCases };

export { test, given, forCases };export default main;
//# sourceMappingURL=sazerac.js.map
