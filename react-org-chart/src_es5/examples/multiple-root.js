'use strict';

var fakeData = require('../utils/fake-data');

var _require = require('../chart'),
    init = _require.init;

var _fakeData = fakeData(),
    children = _fakeData.children;

init({ id: '#root', data: { children: children }, lineType: 'angle' });