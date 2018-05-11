'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('react'),
    createElement = _require.createElement,
    PureComponent = _require.PureComponent;

var _require2 = require('../chart'),
    init = _require2.init;

var OrgChart = function (_PureComponent) {
  _inherits(OrgChart, _PureComponent);

  function OrgChart() {
    _classCallCheck(this, OrgChart);

    return _possibleConstructorReturn(this, (OrgChart.__proto__ || Object.getPrototypeOf(OrgChart)).apply(this, arguments));
  }

  _createClass(OrgChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          id = _props.id,
          tree = _props.tree,
          options = _objectWithoutProperties(_props, ['id', 'tree']);

      init(_extends({ id: '#' + id, data: tree }, options));
    }
  }, {
    key: 'render',
    value: function render() {
      var id = this.props.id;


      return createElement('div', {
        id: id
      });
    }
  }]);

  return OrgChart;
}(PureComponent);

OrgChart.defaultProps = {
  id: 'react-org-chart'
};

module.exports = OrgChart;