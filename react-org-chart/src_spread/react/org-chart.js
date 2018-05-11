function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const { createElement, PureComponent } = require('react');
const { init } = require('../chart');

class OrgChart extends PureComponent {

  componentDidMount() {
    const _props = this.props,
          { id, tree } = _props,
          options = _objectWithoutProperties(_props, ['id', 'tree']);

    init(Object.assign({ id: `#${id}`, data: tree }, options));
  }

  render() {
    const { id } = this.props;

    return createElement('div', {
      id
    });
  }
}

OrgChart.defaultProps = {
  id: 'react-org-chart'
};

module.exports = OrgChart;