var React          = require('react/addons');
var classSet       = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;

var MenuItem = React.createClass({
  propTypes: {
    onSelect: React.PropTypes.func
  },

  getInitialState: function () {
    return {
      open: false
    };
  },

  render: function () {
    var classes = {
      'open'             : this.state.open,
      'dropdown-submenu' : !this.props.isTopLevel && this.hasSubmenu()
    };

    return (
      <li className={classSet(classes)} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
        <a href="#" onClick={this.onClick}>
          {this.getLabel()}
        </a>

        {this.renderSubmenu()}
      </li>
    );
  },

  getLabel: function () {
    return this.hasSubmenu() ? this.props.label : this.props.children;
  },

  hasSubmenu: function () {
    return React.isValidElement(this.props.children);
  },

  renderSubmenu: function () {
    if (!this.hasSubmenu()) return;

    var menu= this.props.children;

    return cloneWithProps(menu, {
      onSelect: this.onSelect
    });
  },

  onSelect: function (key) {
    this.props.onSelect(key);
    this.setDropdownState(false);
  },

  onClick: function (e) {
    e.preventDefault();

    if (this.hasSubmenu()) {
      this.toggleOpen();
    } else {
      this.props.onSelect(this.props.command);
    }
  },

  onMouseOver: function (e) {
    if (!this.props.isTopLevel && this.hasSubmenu()) {
      this.setDropdownState(true);
    }
  },

  onMouseOut: function (e) {
    if (!this.props.isTopLevel && this.hasSubmenu()) {
      this.setDropdownState(false);
    }
  },

  toggleOpen: function () {
    var open = !this.state.open;
    this.setDropdownState(open);
  },

  setDropdownState: function (open) {
    if (open) {
      this.bindCloseHandlers();
    } else {
      this.unbindCloseHandlers();
    }

    this.setState({open: open});
  },

  bindCloseHandlers: function () {
    document.addEventListener('click', this.handleDocumentClick, false);
  },

  unbindCloseHandlers: function () {
    document.removeEventListener('click', this.handleDocumentClick);
  },

  handleDocumentClick: function (e) {
    if (this.getDOMNode().contains(e.target)) {
      return;
    }

    this.setDropdownState(false);
  },

  componentWillUnmount: function () {
    this.unbindCloseHandlers();
  }
});

module.exports = MenuItem;
