const { createElement, PureComponent } = require('react')
const { init } = require('../chart')

class OrgChart extends PureComponent {

  componentDidMount() {
    // const { id, tree, ...options } = this.props

    const initOptions = Object.assign({}, this.props, {
      id: `#${this.props.id}`,
      data: this.props.tree,
    });

    init(initOptions);
  }

  render() {
    const { id } = this.props

    return createElement('div', {
      id
    })
  }
}

OrgChart.defaultProps = {
    id: 'react-org-chart'
}

module.exports = OrgChart
