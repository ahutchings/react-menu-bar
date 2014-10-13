var React          = require('react/addons');
var cloneWithProps = React.addons.cloneWithProps;

var MenuBar = React.createClass({
  propTypes: {
    onSelect: React.PropTypes.func.isRequired
  },

  render: function () {
    return (
      <ul className="menu-bar nav navbar-nav">
        {React.Children.map(this.props.children, this.renderMenuItem)}
      </ul>
    );
  },

  renderMenuItem: function (child) {
    return cloneWithProps(
      child,
      {
        isTopLevel: true,
        onSelect: this.props.onSelect
      }
    );
  }
});

module.exports = MenuBar;
