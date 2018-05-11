'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var OrgChart = require('../react/org-chart');
var fakeData = require('../utils/fake-data');

var root = document.getElementById('root');
var tree = fakeData();

var props = {
  tree: {
    id: 1,
    person: {
      id: 1,
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/spbroma/128.jpg',
      department: '',
      name: 'Imelda Haley',
      title: 'CEO',
      totalReports: 5
    },
    hasChild: true,
    children: []
  },
  loadChildren: function loadChildren(d) {
    // this could also just be `return tree.children`
    return Promise.resolve(tree.children);
  },
  lineType: 'curve'
};

ReactDOM.render(React.createElement(OrgChart, props, null), root);