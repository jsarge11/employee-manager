'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var d3 = require('d3');

var _require = require('../utils'),
    collapse = _require.collapse,
    wrapText = _require.wrapText,
    helpers = _require.helpers;

var defineBoxShadow = require('../defs/box-shadow');
var defineAvatarClip = require('../defs/avatar-clip');
var render = require('./render');
var renderUpdate = require('./render-update');
var defaultConfig = require('./config');

module.exports = {
  init: init
};

function init(options) {
  // Merge options with the default config
  var config = _extends({}, defaultConfig, options, {
    treeData: options.data
  });

  if (!config.id) {
    console.error('react-org-chart: missing id for svg root');
    return;
  }

  var id = config.id,
      treeData = config.treeData,
      lineType = config.lineType,
      margin = config.margin,
      nodeWidth = config.nodeWidth,
      nodeHeight = config.nodeHeight,
      nodeSpacing = config.nodeSpacing,
      shouldResize = config.shouldResize;

  // Calculate how many pixel nodes to be spaced based on the
  // type of line that needs to be rendered

  if (lineType == 'angle') {
    config.lineDepthY = nodeHeight + 40;
  } else {
    config.lineDepthY = nodeHeight + 60;
  }

  // Get the root element
  var elem = document.querySelector(id);

  if (!elem) {
    console.error('react-org-chart: svg root DOM node not found (id: ' + id + ')');
    return;
  }

  // Reset in case there's any existing DOM
  elem.innerHTML = '';

  var elemWidth = elem.offsetWidth;
  var elemHeight = elem.offsetHeight;

  // Setup the d3 tree layout
  config.tree = d3.layout.tree().nodeSize([nodeWidth + nodeSpacing, nodeHeight + nodeSpacing]);

  // Calculate width of a node with expanded children
  var childrenWidth = parseInt(treeData.children.length * nodeWidth / 2);

  // Add svg root for d3
  var svgroot = d3.select(id).append('svg').attr('width', elemWidth).attr('height', elemHeight);

  // Add our base svg group to transform when a user zooms/pans
  var svg = svgroot.append('g').attr('transform', 'translate(' + parseInt(childrenWidth + (elemWidth - childrenWidth * 2) / 2 - margin.left / 2) + ',' + 20 + ')');

  // Define box shadow and avatar border radius
  defineBoxShadow(svgroot, 'boxShadow');
  defineAvatarClip(svgroot, 'avatarClip', {
    borderRadius: 40
  });

  // Center the viewport on initial load
  treeData.x0 = 0;
  treeData.y0 = elemHeight / 2;

  // Collapse all of the children on initial load
  treeData.children.forEach(collapse);

  // Connect core variables to config so that they can be
  // used in internal rendering functions
  config.svg = svg;
  config.svgroot = svgroot;
  config.render = render;

  // Defined zoom behavior
  var zoom = d3.behavior.zoom()
  // Define the [zoomOutBound, zoomInBound]
  .scaleExtent([0.4, 2]).duration(50).on('zoom', renderUpdate(config));

  // Attach zoom behavior to the svg root
  svgroot.call(zoom);

  // Define the point of origin for zoom transformations
  zoom.translate([parseInt(childrenWidth + (elemWidth - childrenWidth * 2) / 2 - margin.left / 2), 20]);

  // Add listener for when the browser or parent node resizes
  var resize = function resize() {
    if (!elem) {
      global.removeEventListener('resize', resize);
      return;
    }

    svgroot.attr('width', elem.offsetWidth).attr('height', elem.offsetHeight);
  };

  if (shouldResize) {
    global.addEventListener('resize', resize);
  }

  // Start initial render
  render(config);

  // Update DOM root height
  d3.select(id).style('height', elemHeight + margin.top + margin.bottom);
}