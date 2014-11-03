var React          = require('react/addons');
var classSet       = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;

var MenuItem = React.createClass({
  propTypes: {
    isMenuBarActive     : React.PropTypes.bool,
    isMenuBarDescendant : React.PropTypes.func.isRequired,
    menuBarEvents       : React.PropTypes.object.isRequired,
    onSelect            : React.PropTypes.func
  },

  getInitialState() {
    return {
      open: false
    };
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.state.open && !prevState.open) {
      this.bindCloseHandlers()
    }

    else if (prevState.open && !this.state.open) {
      this.unbindCloseHandlers()
    }
  },

  componentWillUnmount() {
    this.unbindCloseHandlers();
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
      isMenuBarDescendant : this.props.isMenuBarDescendant,
      menuBarEvents       : this.props.menuBarEvents,
      onSelect            : this.onSelect
    });
  },

  onSelect(key) {
    this.props.onSelect(key);
    this.setState({open: false});
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
    if (this.props.isTopLevel && this.props.isMenuBarActive) {
      this.setState({open: true});
    }

    if (!this.props.isTopLevel && this.hasSubmenu()) {
      this.setState({open: true});
    }
  },

  onMouseOut(e) {
    if (
      this.hasSubmenu() &&
      this.props.isMenuBarDescendant(e.relatedTarget) &&
      !this.isChildElement(e.relatedTarget)
    ) {
      this.setState({open: false});
    }
  },

  toggleOpen() {
    this.setState({open: !this.state.open});
  },

  bindCloseHandlers() {
    document.addEventListener('click', this.onDocumentClick, false);
    this.props.menuBarEvents.addMouseOverListener(this.onMenuBarMouseOver);
  },

  unbindCloseHandlers() {
    document.removeEventListener('click', this.onDocumentClick);
    this.props.menuBarEvents.removeMouseOverListener(this.onMenuBarMouseOver);
  },

  onDocumentClick(e) {
    if (!this.isChildElement(e.target)) {
      this.setState({open: false});
    }
  },

  onMenuBarMouseOver(e) {
    if (!this.isChildElement(e.target)) {
      this.setState({open: false});
    }
  },

  isChildElement(element) {
    return this.getDOMNode().contains(element);
  }
});

module.exports = MenuItem;
