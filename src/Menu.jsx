var React          = require('react/addons');
var cloneWithProps = React.addons.cloneWithProps;

var Menu = React.createClass({
  propTypes: {
    onSelect: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <ul className="dropdown-menu" role="menu">
        {React.Children.map(this.props.children, this.renderChild)}
      </ul>
    );
  },

  renderChild(child) {
    return cloneWithProps(child, {
      onSelect: this.props.onSelect
    });
  }
});

module.exports = Menu;
