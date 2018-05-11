'use strict';

var fakeData = require('../utils/fake-data');

var _require = require('../chart'),
    init = _require.init;

var data = fakeData();

init({ id: '#root', data: data, lineType: 'angle' });