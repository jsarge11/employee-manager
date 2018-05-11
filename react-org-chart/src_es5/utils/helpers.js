'use strict';

module.exports = {
  getTextForTitle: getTextForTitle,
  getTextForDepartment: getTextForDepartment,
  getCursorForNode: getCursorForNode
};

function getTextForTitle(datum) {
  if (!datum.person || !datum.person.totalReports) {
    return '';
  }

  var totalReports = datum.person.totalReports;

  var pluralEnding = totalReports > 1 ? 's' : '';

  return totalReports + ' report' + pluralEnding;
}

var departmentAbbrMap = {
  Marketing: 'mktg',
  Operations: 'ops',
  Growth: 'gwth',
  Branding: 'brand',
  Assurance: 'fin',
  Data: 'data',
  Design: 'design',
  Communications: 'comms',
  Product: 'prod',
  People: 'people',
  Sales: 'sales'
};

function getTextForDepartment(datum) {
  if (!datum.person.department) {
    return '';
  }

  var department = datum.person.department;


  if (departmentAbbrMap[department]) {
    return departmentAbbrMap[department].toUpperCase();
  }

  return datum.person.department.substring(0, 3).toUpperCase();
}

function getCursorForNode(datum) {
  return datum.children || datum._children || datum.hasChild ? 'pointer' : 'default';
}