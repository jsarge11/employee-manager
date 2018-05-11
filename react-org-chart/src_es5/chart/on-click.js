'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var d3 = require('d3');

var _require = require('../utils'),
    collapse = _require.collapse;

var _require2 = require('../'),
    renderUpdate = _require2.renderUpdate;

module.exports = onClick;

function onClick() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var treeData = config.treeData,
      loadChildren = config.loadChildren,
      render = config.render,
      onPersonClick = config.onPersonClick;


  return function (datum) {
    if (onPersonClick) {
      var result = onPersonClick(datum, d3.event);

      // If the `onPersonClick` handler returns `false`
      // Cancel the rest of this click handler
      if (typeof result === 'boolean' && !result) {
        return;
      }
    }

    // If this person doesn't have children but `hasChild` is true,
    // attempt to load using the `loadChildren` config function
    if (!datum.children && !datum._children && datum.hasChild) {
      if (!loadChildren) {
        console.error('react-org-chart.onClick: loadChildren() not found in config');
        return;
      }

      var _result = loadChildren(datum);
      var handler = handleChildrenResult(config, datum);

      // Check if the result is a promise and render the children
      if (_result.then) {
        return _result.then(handler);
      } else {
        return handler(_result);
      }
    }

    if (datum.children) {
      // Collapse the children
      config.callerNode = datum;
      config.callerMode = 0;
      datum._children = datum.children;
      datum.children = null;
    } else {
      // Expand the children
      config.callerNode = datum;
      config.callerMode = 1;
      datum.children = datum._children;
      datum._children = null;
    }

    // Pass in the clicked datum as the sourceNode which
    // tells the child nodes where to animate in from
    render(_extends({}, config, {
      sourceNode: datum
    }));
  };
}

function handleChildrenResult(config, datum) {
  var tree = config.tree,
      render = config.render;


  return function (children) {
    var result = _extends({}, datum, {
      children: children

      // Collapse the nested children
    });children.forEach(collapse);

    result.children.forEach(function (child) {
      if (!tree.nodes(datum)[0]._children) {
        tree.nodes(datum)[0]._children = [];
      }

      child.x = datum.x;
      child.y = datum.y;
      child.x0 = datum.x0;
      child.y0 = datum.y0;

      tree.nodes(datum)[0]._children.push(child);
    });

    if (datum.children) {
      // Collapse the children
      config.callerNode = datum;
      config.callerMode = 0;
      datum._children = datum.children;
      datum.children = null;
    } else {
      // Expand the children
      config.callerNode = null;
      config.callerMode = 1;
      datum.children = datum._children;
      datum._children = null;
    }

    // Pass in the newly rendered datum as the sourceNode
    // which tells the child nodes where to animate in from
    render(_extends({}, config, {
      sourceNode: result
    }));
  };
}