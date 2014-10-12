var React          = require('react/addons');
var cloneWithProps = React.addons.cloneWithProps;

var MenuBar = React.createClass({
  propTypes: {
    onSelect: React.PropTypes.func.isRequired
  },

  render: function () {
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              {React.Children.map(this.props.children, this.renderMenuItem)}
            </ul>
          </div>
        </div>
      </nav>
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
