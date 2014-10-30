var React          = require('react/addons');
var classSet       = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;

var MenuItem = React.createClass({
  propTypes: {
    onSelect: React.PropTypes.func
  },

  getInitialState() {
    return {
      open: false
    };
  },

  render() {
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

  getLabel() {
    return this.hasSubmenu() ? this.props.label : this.props.children;
  },

  hasSubmenu() {
    return React.isValidElement(this.props.children);
  },

  renderSubmenu() {
    if (!this.hasSubmenu()) return;

    var menu = this.props.children;

    return cloneWithProps(menu, {
      onSelect: this.onSelect
    });
  },

  onSelect(key) {
    this.props.onSelect(key);
    this.setDropdownState(false);
  },

  onClick(e) {
    e.preventDefault();

    if (this.hasSubmenu()) {
      this.toggleOpen();
    } else {
      this.props.onSelect(this.props.command);
    }
  },

  onMouseOver(e) {
    if (!this.props.isTopLevel && this.hasSubmenu()) {
      this.setDropdownState(true);
    }
  },

  onMouseOut(e) {
    if (!this.props.isTopLevel && this.hasSubmenu()) {
      this.setDropdownState(false);
    }
  },

  toggleOpen() {
    var open = !this.state.open;
    this.setDropdownState(open);
  },

  setDropdownState(open) {
    if (open) {
      this.bindCloseHandlers();
    } else {
      this.unbindCloseHandlers();
    }

    this.setState({open: open});
  },

  bindCloseHandlers() {
    document.addEventListener('click', this.handleDocumentClick, false);
  },

  unbindCloseHandlers() {
    document.removeEventListener('click', this.handleDocumentClick);
  },

  handleDocumentClick(e) {
    if (this.getDOMNode().contains(e.target)) {
      return;
    }

    this.setDropdownState(false);
  },

  componentWillUnmount() {
    this.unbindCloseHandlers();
  }
});

module.exports = MenuItem;
