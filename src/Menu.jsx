var React          = require('react/addons');
var cloneWithProps = React.addons.cloneWithProps;

var Menu = React.createClass({
  propTypes: {
    onSelect: React.PropTypes.func.isRequired
  },

  render: function () {
    return (
      <ul className="dropdown-menu" role="menu">
        {React.Children.map(this.props.children, this.renderChild)}
      </ul>
    );
  },

  renderChild: function (child) {
    return cloneWithProps(child, {
      onSelect: this.props.onSelect
    });
  }
});

module.exports = Menu;
