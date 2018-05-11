'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var defaultConfig = {
  width: '100%',
  height: '100%',
  x: null,
  y: null,
  radius: 1
};

module.exports = function defineBorderRadius(svg, id) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  config = _extends({}, defaultConfig, config);

  var defs = svg.append('svg:defs');
  var rectId = id + '-rect';

  defs.append('rect').attr('id', rectId).attr('height', '100%').attr('width', '100%').attr('rx', config.radius);

  defs.append('clipPath').attr('id', id).append('use').attr('xlink:href', '#' + rectId);
};