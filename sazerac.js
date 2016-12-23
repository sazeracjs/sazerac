import { at, concat, filter, forEach, isArray, isFunction, isString, isUndefined, map, toArray } from 'lodash';
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

var lastCaseIndex = function lastCaseIndex(ctx) {
  if (ctx && ctx.cases && ctx.cases.length > 0) {
    return ctx.cases.length - 1;
  }
};

var lastCaseIndex$1 = _get__$1("lastCaseIndex");

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
    case "lastCaseIndex":
      return lastCaseIndex;
  }

  return undefined;
}

function _set_original__$1(variableName, _value) {
  switch (variableName) {}

  return undefined;
}

function _set__$1(variableName, value) {
  if ((typeof variableName === "undefined" ? "undefined" : _typeof(variableName)) === 'object') {
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

var _typeOfOriginalExport$1 = typeof lastCaseIndex === "undefined" ? "undefined" : _typeof(lastCaseIndex);

function addNonEnumerableProperty$1(name, value) {
  Object.defineProperty(lastCaseIndex, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if ((_typeOfOriginalExport$1 === 'object' || _typeOfOriginalExport$1 === 'function') && Object.isExtensible(lastCaseIndex)) {
  addNonEnumerableProperty$1('__get__', _get__$1);
  addNonEnumerableProperty$1('__GetDependency__', _get__$1);
  addNonEnumerableProperty$1('__Rewire__', _set__$1);
  addNonEnumerableProperty$1('__set__', _set__$1);
  addNonEnumerableProperty$1('__reset__', _reset__$1);
  addNonEnumerableProperty$1('__ResetDependency__', _reset__$1);
  addNonEnumerableProperty$1('__with__', _with__$1);
  addNonEnumerableProperty$1('__RewireAPI__', _RewireAPI__$1);
}

var convertCase = function convertCase(str) {
  return str.toLowerCase().replace(/_([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
};

var convertCase$1 = _get__$3("convertCase");
var _RewiredData__$3 = Object.create(null);

var INTENTIONAL_UNDEFINED$3 = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__$3 = {};

(function () {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__$3, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }

  addPropertyToAPIObject('__get__', _get__$3);
  addPropertyToAPIObject('__GetDependency__', _get__$3);
  addPropertyToAPIObject('__Rewire__', _set__$3);
  addPropertyToAPIObject('__set__', _set__$3);
  addPropertyToAPIObject('__reset__', _reset__$3);
  addPropertyToAPIObject('__ResetDependency__', _reset__$3);
  addPropertyToAPIObject('__with__', _with__$3);
})();

function _get__$3(variableName) {
  if (_RewiredData__$3 === undefined || _RewiredData__$3[variableName] === undefined) {
    return _get_original__$3(variableName);
  } else {
    var value = _RewiredData__$3[variableName];

    if (value === INTENTIONAL_UNDEFINED$3) {
      return undefined;
    } else {
      return value;
    }
  }
}

function _get_original__$3(variableName) {
  switch (variableName) {
    case "convertCase":
      return convertCase;
  }

  return undefined;
}

function _set_original__$3(variableName, _value) {
  switch (variableName) {}

  return undefined;
}

function _set__$3(variableName, value) {
  if ((typeof variableName === "undefined" ? "undefined" : _typeof(variableName)) === 'object') {
    Object.keys(variableName).forEach(function (name) {
      _RewiredData__$3[name] = variableName[name];
    });
  } else {
    if (value === undefined) {
      _RewiredData__$3[variableName] = INTENTIONAL_UNDEFINED$3;
    } else {
      _RewiredData__$3[variableName] = value;
    }

    return function () {
      _reset__$3(variableName);
    };
  }
}

function _reset__$3(variableName) {
  delete _RewiredData__$3[variableName];
}

function _with__$3(object) {
  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};

  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      _RewiredData__$3[variableName] = previousValues[variableName];
    });
  }

  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = _RewiredData__$3[variableName];
      _RewiredData__$3[variableName] = object[variableName];
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

var _typeOfOriginalExport$3 = typeof convertCase === "undefined" ? "undefined" : _typeof(convertCase);

function addNonEnumerableProperty$3(name, value) {
  Object.defineProperty(convertCase, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if ((_typeOfOriginalExport$3 === 'object' || _typeOfOriginalExport$3 === 'function') && Object.isExtensible(convertCase)) {
  addNonEnumerableProperty$3('__get__', _get__$3);
  addNonEnumerableProperty$3('__GetDependency__', _get__$3);
  addNonEnumerableProperty$3('__Rewire__', _set__$3);
  addNonEnumerableProperty$3('__set__', _set__$3);
  addNonEnumerableProperty$3('__reset__', _reset__$3);
  addNonEnumerableProperty$3('__ResetDependency__', _reset__$3);
  addNonEnumerableProperty$3('__with__', _with__$3);
  addNonEnumerableProperty$3('__RewireAPI__', _RewireAPI__$3);
}

var defaultDescribeTest = function defaultDescribeTest(fn) {
  if (_get__$6('isFunction')(fn) && fn.name) {
    return fn.name + '()';
  }
};

var defaultDescribeCase = function defaultDescribeCase() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  if (args.length > 0) {
    var formattedArgs = args.map(function (arg) {
      return _get__$6('formatString')(arg);
    });
    return 'when given ' + formattedArgs.join(' and ');
  } else {
    return 'when called';
  }
};

var defaultShouldMessage = function defaultShouldMessage(expectedValue) {
  return 'should return ' + _get__$6('formatString')(expectedValue);
};

var formatString = function formatString(str) {
  if (_get__$6('isString')(str)) return "'" + str + "'";
  return str;
};

var _DefaultExportValue$4 = { defaultDescribeTest: _get__$6('defaultDescribeTest'), defaultDescribeCase: _get__$6('defaultDescribeCase'), defaultShouldMessage: _get__$6('defaultShouldMessage') };
var _RewiredData__$6 = Object.create(null);

var INTENTIONAL_UNDEFINED$6 = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__$6 = {};

(function () {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__$6, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }

  addPropertyToAPIObject('__get__', _get__$6);
  addPropertyToAPIObject('__GetDependency__', _get__$6);
  addPropertyToAPIObject('__Rewire__', _set__$6);
  addPropertyToAPIObject('__set__', _set__$6);
  addPropertyToAPIObject('__reset__', _reset__$6);
  addPropertyToAPIObject('__ResetDependency__', _reset__$6);
  addPropertyToAPIObject('__with__', _with__$6);
})();

function _get__$6(variableName) {
  if (_RewiredData__$6 === undefined || _RewiredData__$6[variableName] === undefined) {
    return _get_original__$6(variableName);
  } else {
    var value = _RewiredData__$6[variableName];

    if (value === INTENTIONAL_UNDEFINED$6) {
      return undefined;
    } else {
      return value;
    }
  }
}

function _get_original__$6(variableName) {
  switch (variableName) {
    case 'isFunction':
      return isFunction;

    case 'formatString':
      return formatString;

    case 'isString':
      return isString;

    case 'defaultDescribeTest':
      return defaultDescribeTest;

    case 'defaultDescribeCase':
      return defaultDescribeCase;

    case 'defaultShouldMessage':
      return defaultShouldMessage;
  }

  return undefined;
}

function _set_original__$6(variableName, _value) {
  switch (variableName) {}

  return undefined;
}

function _set__$6(variableName, value) {
  if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
    Object.keys(variableName).forEach(function (name) {
      _RewiredData__$6[name] = variableName[name];
    });
  } else {
    if (value === undefined) {
      _RewiredData__$6[variableName] = INTENTIONAL_UNDEFINED$6;
    } else {
      _RewiredData__$6[variableName] = value;
    }

    return function () {
      _reset__$6(variableName);
    };
  }
}

function _reset__$6(variableName) {
  delete _RewiredData__$6[variableName];
}

function _with__$6(object) {
  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};

  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      _RewiredData__$6[variableName] = previousValues[variableName];
    });
  }

  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = _RewiredData__$6[variableName];
      _RewiredData__$6[variableName] = object[variableName];
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

var _typeOfOriginalExport$6 = typeof _DefaultExportValue$4 === 'undefined' ? 'undefined' : _typeof(_DefaultExportValue$4);

function addNonEnumerableProperty$6(name, value) {
  Object.defineProperty(_DefaultExportValue$4, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if ((_typeOfOriginalExport$6 === 'object' || _typeOfOriginalExport$6 === 'function') && Object.isExtensible(_DefaultExportValue$4)) {
  addNonEnumerableProperty$6('__get__', _get__$6);
  addNonEnumerableProperty$6('__GetDependency__', _get__$6);
  addNonEnumerableProperty$6('__Rewire__', _set__$6);
  addNonEnumerableProperty$6('__set__', _set__$6);
  addNonEnumerableProperty$6('__reset__', _reset__$6);
  addNonEnumerableProperty$6('__ResetDependency__', _reset__$6);
  addNonEnumerableProperty$6('__with__', _with__$6);
  addNonEnumerableProperty$6('__RewireAPI__', _RewireAPI__$6);
}

var updateCase = function updateCase(cases, caseIndex, fn) {
  return _get__$5('map')(cases, function (tCase, i) {
    if (caseIndex === i) {
      return fn(tCase);
    }
    return tCase;
  });
};

var setCaseProps = function setCaseProps(state, caseIndex, props) {
  return _get__$5('updateCase')(state, caseIndex, function (tCase) {
    return _extends({}, tCase, props);
  });
};

var getCaseProp = function getCaseProp(state, caseIndex, prop) {
  return _get__$5('at')(state, '[' + caseIndex + '].' + prop)[0];
};

var _DefaultExportValue$3 = function _DefaultExportValue$3() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];
  var caseIndex = action.caseIndex;


  switch (action.type) {

    case _get__$5('actionTypes').ADD_CASE:
      var inputParams = _get__$5('toArray')(action.args);
      return _get__$5('concat')(state, {
        inputParams: inputParams,
        describeMessage: _get__$5('defaultDescribeCase')(inputParams)
      });

    case _get__$5('actionTypes').SET_CASE_EXPECTED_VALUE:
      var shouldMsg = _get__$5('getCaseProp')(state, caseIndex, 'shouldMessage');
      return _get__$5('setCaseProps')(state, caseIndex, {
        expectedValue: action.expectedValue,
        shouldMessage: shouldMsg ? shouldMsg : _get__$5('defaultShouldMessage')(action.expectedValue)
      });

    case _get__$5('actionTypes').SET_CASE_DESCRIBE_MESSAGE:
      return _get__$5('setCaseProps')(state, caseIndex, { describeMessage: action.message });

    case _get__$5('actionTypes').SET_CASE_SHOULD_MESSAGE:
      return _get__$5('setCaseProps')(state, caseIndex, { shouldMessage: action.message });

    case _get__$5('actionTypes').INIT:
      return [];

    default:
      return state;

  }
};

var _RewiredData__$5 = Object.create(null);

var INTENTIONAL_UNDEFINED$5 = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__$5 = {};

(function () {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__$5, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }

  addPropertyToAPIObject('__get__', _get__$5);
  addPropertyToAPIObject('__GetDependency__', _get__$5);
  addPropertyToAPIObject('__Rewire__', _set__$5);
  addPropertyToAPIObject('__set__', _set__$5);
  addPropertyToAPIObject('__reset__', _reset__$5);
  addPropertyToAPIObject('__ResetDependency__', _reset__$5);
  addPropertyToAPIObject('__with__', _with__$5);
})();

function _get__$5(variableName) {
  if (_RewiredData__$5 === undefined || _RewiredData__$5[variableName] === undefined) {
    return _get_original__$5(variableName);
  } else {
    var value = _RewiredData__$5[variableName];

    if (value === INTENTIONAL_UNDEFINED$5) {
      return undefined;
    } else {
      return value;
    }
  }
}

function _get_original__$5(variableName) {
  switch (variableName) {
    case 'map':
      return map;

    case 'updateCase':
      return updateCase;

    case 'at':
      return at;

    case 'actionTypes':
      return actionTypes;

    case 'toArray':
      return toArray;

    case 'concat':
      return concat;

    case 'defaultDescribeCase':
      return defaultDescribeCase;

    case 'getCaseProp':
      return getCaseProp;

    case 'setCaseProps':
      return setCaseProps;

    case 'defaultShouldMessage':
      return defaultShouldMessage;
  }

  return undefined;
}

function _set_original__$5(variableName, _value) {
  switch (variableName) {}

  return undefined;
}

function _set__$5(variableName, value) {
  if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
    Object.keys(variableName).forEach(function (name) {
      _RewiredData__$5[name] = variableName[name];
    });
  } else {
    if (value === undefined) {
      _RewiredData__$5[variableName] = INTENTIONAL_UNDEFINED$5;
    } else {
      _RewiredData__$5[variableName] = value;
    }

    return function () {
      _reset__$5(variableName);
    };
  }
}

function _reset__$5(variableName) {
  delete _RewiredData__$5[variableName];
}

function _with__$5(object) {
  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};

  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      _RewiredData__$5[variableName] = previousValues[variableName];
    });
  }

  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = _RewiredData__$5[variableName];
      _RewiredData__$5[variableName] = object[variableName];
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

var _typeOfOriginalExport$5 = typeof _DefaultExportValue$3 === 'undefined' ? 'undefined' : _typeof(_DefaultExportValue$3);

function addNonEnumerableProperty$5(name, value) {
  Object.defineProperty(_DefaultExportValue$3, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if ((_typeOfOriginalExport$5 === 'object' || _typeOfOriginalExport$5 === 'function') && Object.isExtensible(_DefaultExportValue$3)) {
  addNonEnumerableProperty$5('__get__', _get__$5);
  addNonEnumerableProperty$5('__GetDependency__', _get__$5);
  addNonEnumerableProperty$5('__Rewire__', _set__$5);
  addNonEnumerableProperty$5('__set__', _set__$5);
  addNonEnumerableProperty$5('__reset__', _reset__$5);
  addNonEnumerableProperty$5('__ResetDependency__', _reset__$5);
  addNonEnumerableProperty$5('__with__', _with__$5);
  addNonEnumerableProperty$5('__RewireAPI__', _RewireAPI__$5);
}

var _DefaultExportValue$6 = function _DefaultExportValue$6() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];


  switch (action.type) {

    case _get__$7('actionTypes').ADD_CASE_ASSERTION:
      return _get__$7('concat')(state, {
        caseIndex: action.caseIndex,
        shouldMessage: action.message,
        assertFn: action.assertFn
      });

    case _get__$7('actionTypes').INIT:
      return [];

    default:
      return state;

  }
};

var _RewiredData__$7 = Object.create(null);

var INTENTIONAL_UNDEFINED$7 = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__$7 = {};

(function () {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__$7, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }

  addPropertyToAPIObject('__get__', _get__$7);
  addPropertyToAPIObject('__GetDependency__', _get__$7);
  addPropertyToAPIObject('__Rewire__', _set__$7);
  addPropertyToAPIObject('__set__', _set__$7);
  addPropertyToAPIObject('__reset__', _reset__$7);
  addPropertyToAPIObject('__ResetDependency__', _reset__$7);
  addPropertyToAPIObject('__with__', _with__$7);
})();

function _get__$7(variableName) {
  if (_RewiredData__$7 === undefined || _RewiredData__$7[variableName] === undefined) {
    return _get_original__$7(variableName);
  } else {
    var value = _RewiredData__$7[variableName];

    if (value === INTENTIONAL_UNDEFINED$7) {
      return undefined;
    } else {
      return value;
    }
  }
}

function _get_original__$7(variableName) {
  switch (variableName) {
    case 'actionTypes':
      return actionTypes;

    case 'concat':
      return concat;
  }

  return undefined;
}

function _set_original__$7(variableName, _value) {
  switch (variableName) {}

  return undefined;
}

function _set__$7(variableName, value) {
  if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
    Object.keys(variableName).forEach(function (name) {
      _RewiredData__$7[name] = variableName[name];
    });
  } else {
    if (value === undefined) {
      _RewiredData__$7[variableName] = INTENTIONAL_UNDEFINED$7;
    } else {
      _RewiredData__$7[variableName] = value;
    }

    return function () {
      _reset__$7(variableName);
    };
  }
}

function _reset__$7(variableName) {
  delete _RewiredData__$7[variableName];
}

function _with__$7(object) {
  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};

  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      _RewiredData__$7[variableName] = previousValues[variableName];
    });
  }

  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = _RewiredData__$7[variableName];
      _RewiredData__$7[variableName] = object[variableName];
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

var _typeOfOriginalExport$7 = typeof _DefaultExportValue$6 === 'undefined' ? 'undefined' : _typeof(_DefaultExportValue$6);

function addNonEnumerableProperty$7(name, value) {
  Object.defineProperty(_DefaultExportValue$6, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if ((_typeOfOriginalExport$7 === 'object' || _typeOfOriginalExport$7 === 'function') && Object.isExtensible(_DefaultExportValue$6)) {
  addNonEnumerableProperty$7('__get__', _get__$7);
  addNonEnumerableProperty$7('__GetDependency__', _get__$7);
  addNonEnumerableProperty$7('__Rewire__', _set__$7);
  addNonEnumerableProperty$7('__set__', _set__$7);
  addNonEnumerableProperty$7('__reset__', _reset__$7);
  addNonEnumerableProperty$7('__ResetDependency__', _reset__$7);
  addNonEnumerableProperty$7('__with__', _with__$7);
  addNonEnumerableProperty$7('__RewireAPI__', _RewireAPI__$7);
}

var _DefaultExportValue$7 = function _DefaultExportValue$7(state, action) {

  switch (action.type) {
    case _get__$8('actionTypes').INIT:
      return action.describeMessage || _get__$8('defaultDescribeTest')(action.testFn);
    default:
      return state;
  }
};

var _RewiredData__$8 = Object.create(null);

var INTENTIONAL_UNDEFINED$8 = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__$8 = {};

(function () {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__$8, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }

  addPropertyToAPIObject('__get__', _get__$8);
  addPropertyToAPIObject('__GetDependency__', _get__$8);
  addPropertyToAPIObject('__Rewire__', _set__$8);
  addPropertyToAPIObject('__set__', _set__$8);
  addPropertyToAPIObject('__reset__', _reset__$8);
  addPropertyToAPIObject('__ResetDependency__', _reset__$8);
  addPropertyToAPIObject('__with__', _with__$8);
})();

function _get__$8(variableName) {
  if (_RewiredData__$8 === undefined || _RewiredData__$8[variableName] === undefined) {
    return _get_original__$8(variableName);
  } else {
    var value = _RewiredData__$8[variableName];

    if (value === INTENTIONAL_UNDEFINED$8) {
      return undefined;
    } else {
      return value;
    }
  }
}

function _get_original__$8(variableName) {
  switch (variableName) {
    case 'actionTypes':
      return actionTypes;

    case 'defaultDescribeTest':
      return defaultDescribeTest;
  }

  return undefined;
}

function _set_original__$8(variableName, _value) {
  switch (variableName) {}

  return undefined;
}

function _set__$8(variableName, value) {
  if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
    Object.keys(variableName).forEach(function (name) {
      _RewiredData__$8[name] = variableName[name];
    });
  } else {
    if (value === undefined) {
      _RewiredData__$8[variableName] = INTENTIONAL_UNDEFINED$8;
    } else {
      _RewiredData__$8[variableName] = value;
    }

    return function () {
      _reset__$8(variableName);
    };
  }
}

function _reset__$8(variableName) {
  delete _RewiredData__$8[variableName];
}

function _with__$8(object) {
  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};

  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      _RewiredData__$8[variableName] = previousValues[variableName];
    });
  }

  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = _RewiredData__$8[variableName];
      _RewiredData__$8[variableName] = object[variableName];
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

var _typeOfOriginalExport$8 = typeof _DefaultExportValue$7 === 'undefined' ? 'undefined' : _typeof(_DefaultExportValue$7);

function addNonEnumerableProperty$8(name, value) {
  Object.defineProperty(_DefaultExportValue$7, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if ((_typeOfOriginalExport$8 === 'object' || _typeOfOriginalExport$8 === 'function') && Object.isExtensible(_DefaultExportValue$7)) {
  addNonEnumerableProperty$8('__get__', _get__$8);
  addNonEnumerableProperty$8('__GetDependency__', _get__$8);
  addNonEnumerableProperty$8('__Rewire__', _set__$8);
  addNonEnumerableProperty$8('__set__', _set__$8);
  addNonEnumerableProperty$8('__reset__', _reset__$8);
  addNonEnumerableProperty$8('__ResetDependency__', _reset__$8);
  addNonEnumerableProperty$8('__with__', _with__$8);
  addNonEnumerableProperty$8('__RewireAPI__', _RewireAPI__$8);
}

var _DefaultExportValue$8 = function _DefaultExportValue$8(state, action) {

  switch (action.type) {
    case _get__$9('actionTypes').INIT:
      return action.testFn;
    default:
      return state;
  }
};

var _RewiredData__$9 = Object.create(null);

var INTENTIONAL_UNDEFINED$9 = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__$9 = {};

(function () {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__$9, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }

  addPropertyToAPIObject('__get__', _get__$9);
  addPropertyToAPIObject('__GetDependency__', _get__$9);
  addPropertyToAPIObject('__Rewire__', _set__$9);
  addPropertyToAPIObject('__set__', _set__$9);
  addPropertyToAPIObject('__reset__', _reset__$9);
  addPropertyToAPIObject('__ResetDependency__', _reset__$9);
  addPropertyToAPIObject('__with__', _with__$9);
})();

function _get__$9(variableName) {
  if (_RewiredData__$9 === undefined || _RewiredData__$9[variableName] === undefined) {
    return _get_original__$9(variableName);
  } else {
    var value = _RewiredData__$9[variableName];

    if (value === INTENTIONAL_UNDEFINED$9) {
      return undefined;
    } else {
      return value;
    }
  }
}

function _get_original__$9(variableName) {
  switch (variableName) {
    case 'actionTypes':
      return actionTypes;
  }

  return undefined;
}

function _set_original__$9(variableName, _value) {
  switch (variableName) {}

  return undefined;
}

function _set__$9(variableName, value) {
  if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
    Object.keys(variableName).forEach(function (name) {
      _RewiredData__$9[name] = variableName[name];
    });
  } else {
    if (value === undefined) {
      _RewiredData__$9[variableName] = INTENTIONAL_UNDEFINED$9;
    } else {
      _RewiredData__$9[variableName] = value;
    }

    return function () {
      _reset__$9(variableName);
    };
  }
}

function _reset__$9(variableName) {
  delete _RewiredData__$9[variableName];
}

function _with__$9(object) {
  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};

  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      _RewiredData__$9[variableName] = previousValues[variableName];
    });
  }

  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = _RewiredData__$9[variableName];
      _RewiredData__$9[variableName] = object[variableName];
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

var _typeOfOriginalExport$9 = typeof _DefaultExportValue$8 === 'undefined' ? 'undefined' : _typeof(_DefaultExportValue$8);

function addNonEnumerableProperty$9(name, value) {
  Object.defineProperty(_DefaultExportValue$8, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if ((_typeOfOriginalExport$9 === 'object' || _typeOfOriginalExport$9 === 'function') && Object.isExtensible(_DefaultExportValue$8)) {
  addNonEnumerableProperty$9('__get__', _get__$9);
  addNonEnumerableProperty$9('__GetDependency__', _get__$9);
  addNonEnumerableProperty$9('__Rewire__', _set__$9);
  addNonEnumerableProperty$9('__set__', _set__$9);
  addNonEnumerableProperty$9('__reset__', _reset__$9);
  addNonEnumerableProperty$9('__ResetDependency__', _reset__$9);
  addNonEnumerableProperty$9('__with__', _with__$9);
  addNonEnumerableProperty$9('__RewireAPI__', _RewireAPI__$9);
}

var _DefaultExportValue$2 = function _DefaultExportValue$2() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  return {
    testFunction: _get__$4('testFunction')(state.testFunction, action),
    cases: _get__$4('cases')(state.cases, action),
    caseAssertions: _get__$4('caseAssertions')(state.caseAssertions, action),
    describeMessage: _get__$4('describeMessage')(state.describeMessage, action)
  };
};

var _RewiredData__$4 = Object.create(null);

var INTENTIONAL_UNDEFINED$4 = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__$4 = {};

(function () {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__$4, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }

  addPropertyToAPIObject('__get__', _get__$4);
  addPropertyToAPIObject('__GetDependency__', _get__$4);
  addPropertyToAPIObject('__Rewire__', _set__$4);
  addPropertyToAPIObject('__set__', _set__$4);
  addPropertyToAPIObject('__reset__', _reset__$4);
  addPropertyToAPIObject('__ResetDependency__', _reset__$4);
  addPropertyToAPIObject('__with__', _with__$4);
})();

function _get__$4(variableName) {
  if (_RewiredData__$4 === undefined || _RewiredData__$4[variableName] === undefined) {
    return _get_original__$4(variableName);
  } else {
    var value = _RewiredData__$4[variableName];

    if (value === INTENTIONAL_UNDEFINED$4) {
      return undefined;
    } else {
      return value;
    }
  }
}

function _get_original__$4(variableName) {
  switch (variableName) {
    case 'testFunction':
      return _DefaultExportValue$8;

    case 'cases':
      return _DefaultExportValue$3;

    case 'caseAssertions':
      return _DefaultExportValue$6;

    case 'describeMessage':
      return _DefaultExportValue$7;
  }

  return undefined;
}

function _set_original__$4(variableName, _value) {
  switch (variableName) {}

  return undefined;
}

function _set__$4(variableName, value) {
  if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
    Object.keys(variableName).forEach(function (name) {
      _RewiredData__$4[name] = variableName[name];
    });
  } else {
    if (value === undefined) {
      _RewiredData__$4[variableName] = INTENTIONAL_UNDEFINED$4;
    } else {
      _RewiredData__$4[variableName] = value;
    }

    return function () {
      _reset__$4(variableName);
    };
  }
}

function _reset__$4(variableName) {
  delete _RewiredData__$4[variableName];
}

function _with__$4(object) {
  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};

  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      _RewiredData__$4[variableName] = previousValues[variableName];
    });
  }

  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = _RewiredData__$4[variableName];
      _RewiredData__$4[variableName] = object[variableName];
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

var _typeOfOriginalExport$4 = typeof _DefaultExportValue$2 === 'undefined' ? 'undefined' : _typeof(_DefaultExportValue$2);

function addNonEnumerableProperty$4(name, value) {
  Object.defineProperty(_DefaultExportValue$2, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if ((_typeOfOriginalExport$4 === 'object' || _typeOfOriginalExport$4 === 'function') && Object.isExtensible(_DefaultExportValue$2)) {
  addNonEnumerableProperty$4('__get__', _get__$4);
  addNonEnumerableProperty$4('__GetDependency__', _get__$4);
  addNonEnumerableProperty$4('__Rewire__', _set__$4);
  addNonEnumerableProperty$4('__set__', _set__$4);
  addNonEnumerableProperty$4('__reset__', _reset__$4);
  addNonEnumerableProperty$4('__ResetDependency__', _reset__$4);
  addNonEnumerableProperty$4('__with__', _with__$4);
  addNonEnumerableProperty$4('__RewireAPI__', _RewireAPI__$4);
}

var actions = {};
var actionTypes = {};
var state = {};
var listenerFns = [];

var actionsArray = ['INIT', 'ADD_CASE', 'SET_CASE_EXPECTED_VALUE', 'SET_CASE_DESCRIBE_MESSAGE', 'SET_CASE_SHOULD_MESSAGE', 'ADD_CASE_ASSERTION'];

_get__$2('actionsArray').forEach(function (action) {
  _get__$2('actions')[_get__$2('convertCase')(action)] = function (params) {
    return _get__$2('doAction')(action, params);
  };
  _get__$2('actionTypes')[action] = action;
});

var doAction = function doAction(type, params) {
  _assign__$2('state', _get__$2('store')(_get__$2('state'), _extends({ type: type }, params)));
  _get__$2('listenerFns').forEach(function (fn) {
    fn(_get__$2('state'));
  });
  return _get__$2('state');
};

var listener = function listener(fn) {
  if (_get__$2('isFunction')(fn)) {
    _get__$2('listenerFns').push(fn);
  } else {
    throw new Error('invalid listener. ' + fn + ' is not a function');
  }
};

var actions$1 = _get__$2('actions');

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
    case 'actionsArray':
      return actionsArray;

    case 'actions':
      return actions;

    case 'convertCase':
      return convertCase$1;

    case 'doAction':
      return doAction;

    case 'actionTypes':
      return actionTypes;

    case 'state':
      return state;

    case 'store':
      return _DefaultExportValue$2;

    case 'listenerFns':
      return listenerFns;

    case 'isFunction':
      return isFunction;
  }

  return undefined;
}

function _assign__$2(variableName, value) {
  if (_RewiredData__$2 === undefined || _RewiredData__$2[variableName] === undefined) {
    return _set_original__$2(variableName, value);
  } else {
    return _RewiredData__$2[variableName] = value;
  }
}

function _set_original__$2(variableName, _value) {
  switch (variableName) {
    case 'state':
      return state = _value;
  }

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

var _typeOfOriginalExport$2 = typeof actions === 'undefined' ? 'undefined' : _typeof(actions);

function addNonEnumerableProperty$2(name, value) {
  Object.defineProperty(actions, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if ((_typeOfOriginalExport$2 === 'object' || _typeOfOriginalExport$2 === 'function') && Object.isExtensible(actions)) {
  addNonEnumerableProperty$2('__get__', _get__$2);
  addNonEnumerableProperty$2('__GetDependency__', _get__$2);
  addNonEnumerableProperty$2('__Rewire__', _set__$2);
  addNonEnumerableProperty$2('__set__', _set__$2);
  addNonEnumerableProperty$2('__reset__', _reset__$2);
  addNonEnumerableProperty$2('__ResetDependency__', _reset__$2);
  addNonEnumerableProperty$2('__with__', _with__$2);
  addNonEnumerableProperty$2('__RewireAPI__', _RewireAPI__$2);
}

var describer = function describer(context, frameworkFunctions) {
  _get__$10('executeDescribers')(_get__$10('buildDescriberDefinition')(context, frameworkFunctions));
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
        _get__$10('testExecuter')(testFn, inputParams, expectedValue);
      } else if (assertFn) {
        _get__$10('assertionExecuter')(testFn, inputParams, assertFn);
      }
    } else {
      _get__$10('forEach')(calls, function (call) {
        _get__$10('executeDescribers')(call);
      });
    }
  });
};

var testExecuter = function testExecuter(testFn, inputParams, expectedValue) {
  var actualVal = testFn.apply(null, inputParams);
  _get__$10('assert').deepEqual(actualVal, expectedValue);
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
    calls: _get__$10('getCaseDescriberCalls')(context, frameworkFunctions)
  };
};

var getCaseDescriberCalls = function getCaseDescriberCalls(context, frameworkFunctions) {
  var testFunction = context.testFunction,
      cases = context.cases,
      caseAssertions = context.caseAssertions;

  return _get__$10('map')(cases, function (tCase, caseIndex) {
    var assertions = _get__$10('filter')(caseAssertions, ['caseIndex', caseIndex]);
    return _get__$10('getCaseDescriberDef')(tCase, frameworkFunctions, testFunction, assertions);
  });
};

var getCaseDescriberDef = function getCaseDescriberDef(tCase, frameworkFunctions, testFn, assertions) {
  var describeFn = frameworkFunctions.describeFn,
      itFn = frameworkFunctions.itFn;

  return {
    func: describeFn,
    message: tCase.describeMessage,
    calls: _get__$10('getCaseItCalls')(tCase, itFn, testFn, assertions)
  };
};

var getCaseItCalls = function getCaseItCalls(tCase, itFn, testFn, assertions) {
  var shouldMessage = tCase.shouldMessage,
      inputParams = tCase.inputParams,
      expectedValue = tCase.expectedValue;

  var calls = [];
  if (!_get__$10('isUndefined')(expectedValue)) {
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

var describer$1 = _get__$10('describer');
var _RewiredData__$10 = Object.create(null);

var INTENTIONAL_UNDEFINED$10 = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__$10 = {};

(function () {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__$10, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }

  addPropertyToAPIObject('__get__', _get__$10);
  addPropertyToAPIObject('__GetDependency__', _get__$10);
  addPropertyToAPIObject('__Rewire__', _set__$10);
  addPropertyToAPIObject('__set__', _set__$10);
  addPropertyToAPIObject('__reset__', _reset__$10);
  addPropertyToAPIObject('__ResetDependency__', _reset__$10);
  addPropertyToAPIObject('__with__', _with__$10);
})();

function _get__$10(variableName) {
  if (_RewiredData__$10 === undefined || _RewiredData__$10[variableName] === undefined) {
    return _get_original__$10(variableName);
  } else {
    var value = _RewiredData__$10[variableName];

    if (value === INTENTIONAL_UNDEFINED$10) {
      return undefined;
    } else {
      return value;
    }
  }
}

function _get_original__$10(variableName) {
  switch (variableName) {
    case 'executeDescribers':
      return executeDescribers;

    case 'buildDescriberDefinition':
      return buildDescriberDefinition;

    case 'testExecuter':
      return testExecuter;

    case 'assertionExecuter':
      return assertionExecuter;

    case 'forEach':
      return forEach;

    case 'assert':
      return assert;

    case 'getCaseDescriberCalls':
      return getCaseDescriberCalls;

    case 'map':
      return map;

    case 'filter':
      return filter;

    case 'getCaseDescriberDef':
      return getCaseDescriberDef;

    case 'getCaseItCalls':
      return getCaseItCalls;

    case 'isUndefined':
      return isUndefined;

    case 'describer':
      return describer;
  }

  return undefined;
}

function _set_original__$10(variableName, _value) {
  switch (variableName) {}

  return undefined;
}

function _set__$10(variableName, value) {
  if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
    Object.keys(variableName).forEach(function (name) {
      _RewiredData__$10[name] = variableName[name];
    });
  } else {
    if (value === undefined) {
      _RewiredData__$10[variableName] = INTENTIONAL_UNDEFINED$10;
    } else {
      _RewiredData__$10[variableName] = value;
    }

    return function () {
      _reset__$10(variableName);
    };
  }
}

function _reset__$10(variableName) {
  delete _RewiredData__$10[variableName];
}

function _with__$10(object) {
  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};

  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      _RewiredData__$10[variableName] = previousValues[variableName];
    });
  }

  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = _RewiredData__$10[variableName];
      _RewiredData__$10[variableName] = object[variableName];
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

var _typeOfOriginalExport$10 = typeof describer === 'undefined' ? 'undefined' : _typeof(describer);

function addNonEnumerableProperty$10(name, value) {
  Object.defineProperty(describer, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if ((_typeOfOriginalExport$10 === 'object' || _typeOfOriginalExport$10 === 'function') && Object.isExtensible(describer)) {
  addNonEnumerableProperty$10('__get__', _get__$10);
  addNonEnumerableProperty$10('__GetDependency__', _get__$10);
  addNonEnumerableProperty$10('__Rewire__', _set__$10);
  addNonEnumerableProperty$10('__set__', _set__$10);
  addNonEnumerableProperty$10('__reset__', _reset__$10);
  addNonEnumerableProperty$10('__ResetDependency__', _reset__$10);
  addNonEnumerableProperty$10('__with__', _with__$10);
  addNonEnumerableProperty$10('__RewireAPI__', _RewireAPI__$10);
}

var newTestCase = function newTestCase(caseIndex) {
  return {
    ___caseIndex: caseIndex,
    expect: _get__$11('testCaseFn')(caseIndex, 'setCaseExpectedValue', 'expectedValue'),
    describe: _get__$11('testCaseFn')(caseIndex, 'setCaseDescribeMessage', 'message'),
    should: _get__$11('testCaseFn')(caseIndex, 'setCaseShouldMessage', 'message'),
    assert: _get__$11('testCaseFn')(caseIndex, 'addCaseAssertion', ['message', 'assertFn'])
  };
};

var testCaseFn = function testCaseFn(caseIndex, action, paramNames) {
  paramNames = _get__$11('isArray')(paramNames) ? paramNames : [paramNames];
  return function () {
    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    var actionArgs = { caseIndex: caseIndex };
    paramNames.forEach(function (n, i) {
      actionArgs[n] = params[i];
    });
    _get__$11('actions')[action](actionArgs);
    return _get__$11('newTestCase')(caseIndex);
  };
};

var _RewiredData__$11 = Object.create(null);

var INTENTIONAL_UNDEFINED$11 = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__$11 = {};

(function () {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__$11, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }

  addPropertyToAPIObject('__get__', _get__$11);
  addPropertyToAPIObject('__GetDependency__', _get__$11);
  addPropertyToAPIObject('__Rewire__', _set__$11);
  addPropertyToAPIObject('__set__', _set__$11);
  addPropertyToAPIObject('__reset__', _reset__$11);
  addPropertyToAPIObject('__ResetDependency__', _reset__$11);
  addPropertyToAPIObject('__with__', _with__$11);
})();

function _get__$11(variableName) {
  if (_RewiredData__$11 === undefined || _RewiredData__$11[variableName] === undefined) {
    return _get_original__$11(variableName);
  } else {
    var value = _RewiredData__$11[variableName];

    if (value === INTENTIONAL_UNDEFINED$11) {
      return undefined;
    } else {
      return value;
    }
  }
}

function _get_original__$11(variableName) {
  switch (variableName) {
    case 'testCaseFn':
      return testCaseFn;

    case 'isArray':
      return isArray;

    case 'actions':
      return actions$1;

    case 'newTestCase':
      return newTestCase;
  }

  return undefined;
}

function _set_original__$11(variableName, _value) {
  switch (variableName) {}

  return undefined;
}

function _set__$11(variableName, value) {
  if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
    Object.keys(variableName).forEach(function (name) {
      _RewiredData__$11[name] = variableName[name];
    });
  } else {
    if (value === undefined) {
      _RewiredData__$11[variableName] = INTENTIONAL_UNDEFINED$11;
    } else {
      _RewiredData__$11[variableName] = value;
    }

    return function () {
      _reset__$11(variableName);
    };
  }
}

function _reset__$11(variableName) {
  delete _RewiredData__$11[variableName];
}

function _with__$11(object) {
  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};

  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      _RewiredData__$11[variableName] = previousValues[variableName];
    });
  }

  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = _RewiredData__$11[variableName];
      _RewiredData__$11[variableName] = object[variableName];
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

var _typeOfOriginalExport$11 = typeof newTestCase === 'undefined' ? 'undefined' : _typeof(newTestCase);

function addNonEnumerableProperty$11(name, value) {
  Object.defineProperty(newTestCase, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if ((_typeOfOriginalExport$11 === 'object' || _typeOfOriginalExport$11 === 'function') && Object.isExtensible(newTestCase)) {
  addNonEnumerableProperty$11('__get__', _get__$11);
  addNonEnumerableProperty$11('__GetDependency__', _get__$11);
  addNonEnumerableProperty$11('__Rewire__', _set__$11);
  addNonEnumerableProperty$11('__set__', _set__$11);
  addNonEnumerableProperty$11('__reset__', _reset__$11);
  addNonEnumerableProperty$11('__ResetDependency__', _reset__$11);
  addNonEnumerableProperty$11('__with__', _with__$11);
  addNonEnumerableProperty$11('__RewireAPI__', _RewireAPI__$11);
}

var frameworkFns = {
  describeFn: describe,
  itFn: it
};

var _state = void 0;

_get__('listener')(function (state) {
  _assign__('_state', state);
});

var test = function test(testFn, definerFn) {
  _get__('actions').init({ testFn: testFn });
  definerFn();
  _get__('describer')(_get__('_state'), _get__('frameworkFns'));
};

var given = function given() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var state = _get__('actions').addCase({ args: args });
  var caseIndex = _get__('lastCaseIndex')(state);
  return _get__('newTestCase')(caseIndex);
};

var _DefaultExportValue = { test: _get__('test'), given: _get__('given') };
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
    case 'listener':
      return listener;

    case '_state':
      return _state;

    case 'actions':
      return actions;

    case 'describer':
      return describer$1;

    case 'frameworkFns':
      return frameworkFns;

    case 'lastCaseIndex':
      return lastCaseIndex$1;

    case 'newTestCase':
      return newTestCase;

    case 'test':
      return test;

    case 'given':
      return given;
  }

  return undefined;
}

function _assign__(variableName, value) {
  if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
    return _set_original__(variableName, value);
  } else {
    return _RewiredData__[variableName] = value;
  }
}

function _set_original__(variableName, _value) {
  switch (variableName) {
    case '_state':
      return _state = _value;
  }

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

export { test, given, _get__ as __get__, _get__ as __GetDependency__, _set__ as __Rewire__, _set__ as __set__, _reset__ as __ResetDependency__, _RewireAPI__ as __RewireAPI__ };export default _DefaultExportValue;
//# sourceMappingURL=sazerac.js.map
