'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var defaultConfig = {
  width: '150%',
  height: '150%',
  x: 0,
  y: 2,
  blurRadius: 1
};

module.exports = function defineBoxShadow(svg, id) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  config = _extends({}, defaultConfig, config);

  var filter = svg.append('svg:defs').append('svg:filter').attr('id', id).attr('height', '150%').attr('width', '150%');

  filter.append('svg:feGaussianBlur').attr('in', 'SourceAlpha').attr('stdDeviation', config.blurRadius) // stdDeviation is how much to blur
  .attr('result', 'blurOut');

  filter.append('svg:feOffset').attr('in', 'blurOut').attr('dx', config.x).attr('dy', config.y).attr('result', 'offsetOut'); // how much to offset

  var feMerge = filter.append('feMerge');

  feMerge.append('feMergeNode').attr('in', 'offsetOut');
  feMerge.append('feMergeNode').attr('in', 'SourceGraphic');
};