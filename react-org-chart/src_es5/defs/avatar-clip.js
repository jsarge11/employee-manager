'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var defaultConfig = {
  borderRadius: 4
};

module.exports = function defineAvatarClip(svg, id) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  config = _extends({}, defaultConfig, config);

  var defs = svg.append('svg:defs');

  defs.append('clipPath').attr('id', id).append('circle').attr('cx', 34).attr('cy', 34).attr('r', 18);
};