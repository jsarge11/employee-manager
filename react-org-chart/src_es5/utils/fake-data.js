'use strict';

var faker = require('faker');

module.exports = function fakeData() {
  var count = 0;

  var genData = function genData(_ref) {
    var _ref$depth = _ref.depth,
        depth = _ref$depth === undefined ? 0 : _ref$depth,
        _ref$department = _ref.department,
        department = _ref$department === undefined ? '' : _ref$department;

    ++count;

    var id = fakeId();
    var person = getPerson(id, { depth: depth, department: department });

    if (depth > 6 || count >= 20000) {
      return { id: id, person: person, hasChild: false };
    }

    var _getChildren = getChildren({ depth: depth + 1, department: department || person.department }, genData),
        children = _getChildren.children,
        totalReports = _getChildren.totalReports;

    person.totalReports = totalReports;

    return {
      id: id,
      person: person,
      hasChild: true,
      children: children
    };
  };

  var data = genData({});

  console.log('total nodes', count);

  return data;
};

function fakeId() {
  return Math.floor(Math.random() * 300000);
}

function getPerson(id, _ref2) {
  var depth = _ref2.depth,
      department = _ref2.department;

  return {
    id: id,
    avatar: faker.image.avatar(), // 'https://github.com/fouad.png',
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    title: depth > 0 ? faker.name.jobTitle() : 'CEO',
    department: depth > 0 ? department || getDept() : ''
  };
}

var depts = ['Engineering', 'Product', 'Communications', 'Marketing', 'HR', 'Design'];

function getDept() {
  var randIndex = Math.floor(depts.length * Math.random());

  return depts[randIndex];
}

function getChildren(_ref3, genData) {
  var depth = _ref3.depth,
      department = _ref3.department;

  var length = Math.ceil(Math.random() * 6) + (4 - depth);

  if (length < 0) {
    return { totalReports: 0, children: [] };
  }

  return {
    totalReports: length,
    children: Array.apply(null, { length: length }).map(function (_) {
      return genData({ depth: depth + 1, department: department });
    })
  };
}