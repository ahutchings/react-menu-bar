var React          = require('react/addons');
var cloneWithProps = React.addons.cloneWithProps;

var Menu = React.createClass({
  propTypes: {
    onSelect: React.PropTypes.func.isRequired
  },

  render: function () {
    return (
      <ul className="dropdown-menu" role="menu">
        {React.Children.map(this.props.children, this.renderMenuItem)}
      </ul>
    );
  },

  renderMenuItem: function (child) {
    return cloneWithProps(
      child,
      {
        onSelect: this.props.onSelect,
        key: child.props.key
      }
    );
  }
});

module.exports = Menu;
