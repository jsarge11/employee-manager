'use strict';

var d3 = require('d3');

module.exports = renderUpdate;

// Update the rendered node positions triggered by zoom
function renderUpdate(_ref) {
  var svg = _ref.svg;

  return function () {
    svg.attr('transform', 'translate(' + d3.event.translate + ')\n     scale(' + d3.event.scale.toFixed(1) + ')');
  };
}