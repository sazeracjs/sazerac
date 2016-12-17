import { concat, forEach, isString, map, toArray } from 'lodash';
import { assert } from 'chai';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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

var init = function init(fn, describeMessage) {
  return {
    testFunction: fn,
    cases: [],
    describeMessage: describeMessage || fn.name + '()'
  };
};

var addCase = function addCase(ctx, args) {

  var argsArray = _get__$1('toArray')(args);

  return _extends({}, ctx, {
    cases: _get__$1('concat')(_get__$1('resetContext')(ctx.cases), {
      inputParams: argsArray,
      contextActive: true,
      describeMessage: _get__$1('describeCase')(argsArray)
    })
  });
};

var addExpectedValue = function addExpectedValue(ctx, expectedVal) {
  return _extends({}, ctx, {
    cases: _get__$1('mapActiveCases')(ctx.cases, function (tCase) {
      return _extends({}, tCase, {
        expectedValue: expectedVal,
        shouldMessage: _get__$1('shouldMessage')(expectedVal)
      });
    })
  });
};

var setDescribeMessage = function setDescribeMessage(ctx, applyToAll, message) {
  var setMsgProp = function setMsgProp(tCase) {
    return _extends({}, tCase, { describeMessage: message });
  };
  var cases = applyToAll ? _get__$1('map')(ctx.cases, setMsgProp) : _get__$1('mapActiveCases')(ctx.cases, setMsgProp);
  return _extends({}, ctx, { cases: cases });
};

var mapActiveCases = function mapActiveCases(cases, fn) {
  return _get__$1('map')(cases, function (tCase) {
    if (tCase.contextActive) return fn(tCase);
    return tCase;
  });
};

var resetContext = function resetContext(cases) {
  return _get__$1('map')(cases, function (c) {
    return _extends({}, c, {
      contextActive: false
    });
  });
};

var describeCase = function describeCase() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  if (args.length > 0) {
    var formattedArgs = args.map(function (arg) {
      return _get__$1('formatString')(arg);
    });
    return 'when given ' + formattedArgs.join(' and ');
  } else {
    return 'when called';
  }
};

var shouldMessage = function shouldMessage(expectedValue) {
  return 'should return ' + _get__$1('formatString')(expectedValue);
};

var formatString = function formatString(str) {
  if (_get__$1('isString')(str)) return "'" + str + "'";
  return str;
};

var _DefaultExportValue$2 = {
  init: _get__$1('init'),
  addCase: _get__$1('addCase'),
  addExpectedValue: _get__$1('addExpectedValue'),
  setDescribeMessage: _get__$1('setDescribeMessage')
};
var _RewiredData__$1 = Object.create(null);

var INTENTIONAL_UNDEFINED$1 = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__$1 = {};

(function () {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__$1, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }

  addPropertyToAPIObject('__get__', _get__$1);
  addPropertyToAPIObject('__GetDependency__', _get__$1);
  addPropertyToAPIObject('__Rewire__', _set__$1);
  addPropertyToAPIObject('__set__', _set__$1);
  addPropertyToAPIObject('__reset__', _reset__$1);
  addPropertyToAPIObject('__ResetDependency__', _reset__$1);
  addPropertyToAPIObject('__with__', _with__$1);
})();

function _get__$1(variableName) {
  if (_RewiredData__$1 === undefined || _RewiredData__$1[variableName] === undefined) {
    return _get_original__$1(variableName);
  } else {
    var value = _RewiredData__$1[variableName];

    if (value === INTENTIONAL_UNDEFINED$1) {
      return undefined;
    } else {
      return value;
    }
  }
}

function _get_original__$1(variableName) {
  switch (variableName) {
    case 'toArray':
      return toArray;

    case 'concat':
      return concat;

    case 'resetContext':
      return resetContext;

    case 'describeCase':
      return describeCase;

    case 'mapActiveCases':
      return mapActiveCases;

    case 'shouldMessage':
      return shouldMessage;

    case 'map':
      return map;

    case 'formatString':
      return formatString;

    case 'isString':
      return isString;

    case 'init':
      return init;

    case 'addCase':
      return addCase;

    case 'addExpectedValue':
      return addExpectedValue;

    case 'setDescribeMessage':
      return setDescribeMessage;
  }

  return undefined;
}

function _set_original__$1(variableName, _value) {
  switch (variableName) {}

  return undefined;
}

function _set__$1(variableName, value) {
  if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
    Object.keys(variableName).forEach(function (name) {
      _RewiredData__$1[name] = variableName[name];
    });
  } else {
    if (value === undefined) {
      _RewiredData__$1[variableName] = INTENTIONAL_UNDEFINED$1;
    } else {
      _RewiredData__$1[variableName] = value;
    }

    return function () {
      _reset__$1(variableName);
    };
  }
}

function _reset__$1(variableName) {
  delete _RewiredData__$1[variableName];
}

function _with__$1(object) {
  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};

  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      _RewiredData__$1[variableName] = previousValues[variableName];
    });
  }

  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = _RewiredData__$1[variableName];
      _RewiredData__$1[variableName] = object[variableName];
    });
    var result = callback();

    if (!!result && typeof result.then == 'function') {
      result.then(reset).catch(reset);
    } else {
      reset();
    }

    return result;
  };
}

var _typeOfOriginalExport$1 = typeof _DefaultExportValue$2 === 'undefined' ? 'undefined' : _typeof(_DefaultExportValue$2);

function addNonEnumerableProperty$1(name, value) {
  Object.defineProperty(_DefaultExportValue$2, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if ((_typeOfOriginalExport$1 === 'object' || _typeOfOriginalExport$1 === 'function') && Object.isExtensible(_DefaultExportValue$2)) {
  addNonEnumerableProperty$1('__get__', _get__$1);
  addNonEnumerableProperty$1('__GetDependency__', _get__$1);
  addNonEnumerableProperty$1('__Rewire__', _set__$1);
  addNonEnumerableProperty$1('__set__', _set__$1);
  addNonEnumerableProperty$1('__reset__', _reset__$1);
  addNonEnumerableProperty$1('__ResetDependency__', _reset__$1);
  addNonEnumerableProperty$1('__with__', _with__$1);
  addNonEnumerableProperty$1('__RewireAPI__', _RewireAPI__$1);
}

var describer = function describer(context, frameworkFunctions) {
  _get__$2('executeDescribers')(_get__$2('buildDescriberDefinition')(context, frameworkFunctions));
};

var executeDescribers = function executeDescribers(def) {
  var func = def.func,
      message = def.message,
      calls = def.calls,
      test = def.test;

  func(message, function () {
    test ? _get__$2('testExecuter').apply(null, test) : _get__$2('forEach')(calls, function (call) {
      _get__$2('executeDescribers')(call);
    });
  });
};

var testExecuter = function testExecuter(testFunction, inputParams, expectedValue) {
  var actualVal = testFunction.apply(null, inputParams);
  _get__$2('assert').deepEqual(actualVal, expectedValue);
};

var buildDescriberDefinition = function buildDescriberDefinition(context, frameworkFunctions) {
  var describeFn = frameworkFunctions.describeFn;
  var testFunction = context.testFunction,
      cases = context.cases,
      describeMessage = context.describeMessage;

  return {
    func: describeFn,
    message: describeMessage,
    calls: _get__$2('map')(cases, function (tCase) {
      return _get__$2('getCaseDescriberDef')(tCase, frameworkFunctions, testFunction);
    })
  };
};

var getCaseDescriberDef = function getCaseDescriberDef(tCase, frameworkFunctions, testFunction) {
  var describeFn = frameworkFunctions.describeFn,
      itFn = frameworkFunctions.itFn;

  return {
    func: describeFn,
    message: tCase.describeMessage,
    calls: [_get__$2('getCaseShouldDef')(tCase, itFn, testFunction)]
  };
};

var getCaseShouldDef = function getCaseShouldDef(tCase, itFn, testFunction) {
  var shouldMessage = tCase.shouldMessage,
      inputParams = tCase.inputParams,
      expectedValue = tCase.expectedValue;

  return {
    func: itFn,
    message: shouldMessage,
    test: [testFunction, inputParams, expectedValue]
  };
};

var describer$1 = _get__$2('describer');
var _RewiredData__$2 = Object.create(null);

var INTENTIONAL_UNDEFINED$2 = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__$2 = {};

(function () {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__$2, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }

  addPropertyToAPIObject('__get__', _get__$2);
  addPropertyToAPIObject('__GetDependency__', _get__$2);
  addPropertyToAPIObject('__Rewire__', _set__$2);
  addPropertyToAPIObject('__set__', _set__$2);
  addPropertyToAPIObject('__reset__', _reset__$2);
  addPropertyToAPIObject('__ResetDependency__', _reset__$2);
  addPropertyToAPIObject('__with__', _with__$2);
})();

function _get__$2(variableName) {
  if (_RewiredData__$2 === undefined || _RewiredData__$2[variableName] === undefined) {
    return _get_original__$2(variableName);
  } else {
    var value = _RewiredData__$2[variableName];

    if (value === INTENTIONAL_UNDEFINED$2) {
      return undefined;
    } else {
      return value;
    }
  }
}

function _get_original__$2(variableName) {
  switch (variableName) {
    case 'executeDescribers':
      return executeDescribers;

    case 'buildDescriberDefinition':
      return buildDescriberDefinition;

    case 'testExecuter':
      return testExecuter;

    case 'forEach':
      return forEach;

    case 'assert':
      return assert;

    case 'map':
      return map;

    case 'getCaseDescriberDef':
      return getCaseDescriberDef;

    case 'getCaseShouldDef':
      return getCaseShouldDef;

    case 'describer':
      return describer;
  }

  return undefined;
}

function _set_original__$2(variableName, _value) {
  switch (variableName) {}

  return undefined;
}

function _set__$2(variableName, value) {
  if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
    Object.keys(variableName).forEach(function (name) {
      _RewiredData__$2[name] = variableName[name];
    });
  } else {
    if (value === undefined) {
      _RewiredData__$2[variableName] = INTENTIONAL_UNDEFINED$2;
    } else {
      _RewiredData__$2[variableName] = value;
    }

    return function () {
      _reset__$2(variableName);
    };
  }
}

function _reset__$2(variableName) {
  delete _RewiredData__$2[variableName];
}

function _with__$2(object) {
  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};

  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      _RewiredData__$2[variableName] = previousValues[variableName];
    });
  }

  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = _RewiredData__$2[variableName];
      _RewiredData__$2[variableName] = object[variableName];
    });
    var result = callback();

    if (!!result && typeof result.then == 'function') {
      result.then(reset).catch(reset);
    } else {
      reset();
    }

    return result;
  };
}

var _typeOfOriginalExport$2 = typeof describer === 'undefined' ? 'undefined' : _typeof(describer);

function addNonEnumerableProperty$2(name, value) {
  Object.defineProperty(describer, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if ((_typeOfOriginalExport$2 === 'object' || _typeOfOriginalExport$2 === 'function') && Object.isExtensible(describer)) {
  addNonEnumerableProperty$2('__get__', _get__$2);
  addNonEnumerableProperty$2('__GetDependency__', _get__$2);
  addNonEnumerableProperty$2('__Rewire__', _set__$2);
  addNonEnumerableProperty$2('__set__', _set__$2);
  addNonEnumerableProperty$2('__reset__', _reset__$2);
  addNonEnumerableProperty$2('__ResetDependency__', _reset__$2);
  addNonEnumerableProperty$2('__with__', _with__$2);
  addNonEnumerableProperty$2('__RewireAPI__', _RewireAPI__$2);
}

var frameworkFns = {
  describeFn: describe,
  itFn: it
};

var test = function test(fn) {
  var ctx = _get__('context').init(fn);
  return _get__('chain')(ctx);
};

var givenFn = function givenFn(ctx) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var newCtx = _get__('context').addCase(ctx, args);
    return _get__('chain')(newCtx);
  };
};

var expectFn = function expectFn(ctx) {
  return function (expectedVal) {
    var newCtx = _get__('context').addExpectedValue(ctx, expectedVal);
    return _get__('chain')(newCtx);
  };
};

var describeFn = function describeFn(ctx, applyToAll) {
  return function (message) {
    var newCtx = _get__('context').setDescribeMessage(ctx, applyToAll, message);
    return _get__('chain')(newCtx);
  };
};

var runFn = function runFn(ctx) {
  return function () {
    _get__('describer')(ctx, _get__('frameworkFns'));
  };
};

var chain = function chain(ctx) {
  return {
    test: _get__('test'),
    given: _get__('givenFn')(ctx),
    expect: _get__('expectFn')(ctx),
    run: _get__('runFn')(ctx),
    describe: _get__('describeFn')(ctx),
    all: {
      describe: _get__('describeFn')(ctx, true)
    }
  };
};

var _DefaultExportValue = _get__('chain')();

var _RewiredData__ = Object.create(null);

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};

(function () {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }

  addPropertyToAPIObject('__get__', _get__);
  addPropertyToAPIObject('__GetDependency__', _get__);
  addPropertyToAPIObject('__Rewire__', _set__);
  addPropertyToAPIObject('__set__', _set__);
  addPropertyToAPIObject('__reset__', _reset__);
  addPropertyToAPIObject('__ResetDependency__', _reset__);
  addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
  if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
    return _get_original__(variableName);
  } else {
    var value = _RewiredData__[variableName];

    if (value === INTENTIONAL_UNDEFINED) {
      return undefined;
    } else {
      return value;
    }
  }
}

function _get_original__(variableName) {
  switch (variableName) {
    case 'context':
      return _DefaultExportValue$2;

    case 'chain':
      return chain;

    case 'describer':
      return describer$1;

    case 'frameworkFns':
      return frameworkFns;

    case 'test':
      return test;

    case 'givenFn':
      return givenFn;

    case 'expectFn':
      return expectFn;

    case 'runFn':
      return runFn;

    case 'describeFn':
      return describeFn;
  }

  return undefined;
}

function _set_original__(variableName, _value) {
  switch (variableName) {}

  return undefined;
}

function _set__(variableName, value) {
  if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
    Object.keys(variableName).forEach(function (name) {
      _RewiredData__[name] = variableName[name];
    });
  } else {
    if (value === undefined) {
      _RewiredData__[variableName] = INTENTIONAL_UNDEFINED;
    } else {
      _RewiredData__[variableName] = value;
    }

    return function () {
      _reset__(variableName);
    };
  }
}

function _reset__(variableName) {
  delete _RewiredData__[variableName];
}

function _with__(object) {
  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};

  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      _RewiredData__[variableName] = previousValues[variableName];
    });
  }

  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = _RewiredData__[variableName];
      _RewiredData__[variableName] = object[variableName];
    });
    var result = callback();

    if (!!result && typeof result.then == 'function') {
      result.then(reset).catch(reset);
    } else {
      reset();
    }

    return result;
  };
}

var _typeOfOriginalExport = typeof _DefaultExportValue === 'undefined' ? 'undefined' : _typeof(_DefaultExportValue);

function addNonEnumerableProperty(name, value) {
  Object.defineProperty(_DefaultExportValue, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(_DefaultExportValue)) {
  addNonEnumerableProperty('__get__', _get__);
  addNonEnumerableProperty('__GetDependency__', _get__);
  addNonEnumerableProperty('__Rewire__', _set__);
  addNonEnumerableProperty('__set__', _set__);
  addNonEnumerableProperty('__reset__', _reset__);
  addNonEnumerableProperty('__ResetDependency__', _reset__);
  addNonEnumerableProperty('__with__', _with__);
  addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}

export { _get__ as __get__, _get__ as __GetDependency__, _set__ as __Rewire__, _set__ as __set__, _reset__ as __ResetDependency__, _RewireAPI__ as __RewireAPI__ };export default _DefaultExportValue;
//# sourceMappingURL=sazerac.js.map
