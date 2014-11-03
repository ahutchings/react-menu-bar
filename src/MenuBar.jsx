var React          = require('react/addons');
var MenuBarEvents  = require('./MenuBarEvents');
var cloneWithProps = React.addons.cloneWithProps;

var MenuBar = React.createClass({
  propTypes: {
    onSelect: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      isActive: false
    };
  },

  componentWillMount() {
    this.setState({
      events: new MenuBarEvents()
    });
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isActive && !prevState.isActive) {
      this.bindSetInactiveHandler()
    }

    else if (prevState.isActive && !this.state.isActive) {
      this.unbindSetInactiveHandler()
    }
  },

  render() {
    return (
      <ul className="menu-bar nav navbar-nav" onClick={this.onClick} onMouseOver={this.onMouseOver}>
        {React.Children.map(this.props.children, this.renderMenuItem)}
      </ul>
    );
  },

  renderMenuItem(child) {
    return cloneWithProps(child, {
      isMenuBarActive     : this.state.isActive,
      isMenuBarDescendant : this.isMenuBarDescendant,
      isTopLevel          : true,
      menuBarEvents       : this.state.events,
      onSelect            : this.props.onSelect
    });
  },

  isMenuBarDescendant(element) {
    return this.getDOMNode().contains(element);
  },

  bindSetInactiveHandler() {
    document.addEventListener('click', this.handleDocumentClick, false);
  },

  unbindSetInactiveHandler() {
    document.removeEventListener('click', this.handleDocumentClick);
  },

  handleDocumentClick(e) {
    this.setState({isActive: false});
  },

  onClick(e) {
    this.setState({isActive: !this.state.isActive});
  },

  onMouseOver(e) {
    this.state.events.emitMouseOver(e);
  }
});

module.exports = MenuBar;
