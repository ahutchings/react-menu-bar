# react-menu-bar

Menu bar component for [React][1].

## Installation

```sh
npm install --save react-menu-bar
```

## Usage

```js
var {MenuBar, MenuItem, Menu, Separator} = require('react-menu-bar');

var MyMenuBar = React.createClass({
  render: function () {
    return (
      <MenuBar onSelect={this.onSelect}>
        <MenuItem label="File">
          <Menu>
            <MenuItem command="new-window">New Window</MenuItem>
            <MenuItem command="new-file">New File</MenuItem>
          </Menu>
        </MenuItem>

        <MenuItem label="Edit">
          <Menu>
            <MenuItem command="undo">Undo</MenuItem>
            <MenuItem command="redo">Redo</MenuItem>
            <Separator />
            <MenuItem label="Find">
              <Menu>
                <MenuItem command="find">Find…</MenuItem>
                <MenuItem command="find-next">Find Next</MenuItem>
                <MenuItem command="find-previous">Find Previous</MenuItem>
                <MenuItem command="use-selection-for-find">Use Selection For Find</MenuItem>
              </Menu>
            </MenuItem>
          </Menu>
        </MenuItem>

        <MenuItem label="Help">
          <Menu>
            <MenuItem command="terms-of-use">Terms of Use</MenuItem>
            <MenuItem command="documentation">Documentation</MenuItem>
            <Separator />
            <MenuItem command="release-notes">Release Notes</MenuItem>
          </Menu>
        </MenuItem>
      </MenuBar>
    );
  },

  onSelect: function (command) {
    console.log('Selected: %s', command);
  }
});
```

[1]: https://facebook.github.io/react/
