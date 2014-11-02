var React          = require('react/addons');
var cloneWithProps = React.addons.cloneWithProps;

var Menu = React.createClass({
  propTypes: {
    isMenuBarDescendant : React.PropTypes.func.isRequired,
    menuBarEvents       : React.PropTypes.object.isRequired,
    onSelect            : React.PropTypes.func.isRequired
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
      isMenuBarDescendant : this.props.isMenuBarDescendant,
      menuBarEvents       : this.props.menuBarEvents,
      onSelect            : this.props.onSelect
    });
  }
});

module.exports = Menu;
