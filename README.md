# react-menu-bar

Menu bar component for [React][1].

## Usage

```js
var {MenuBar, MenuItem, Menu, Separator} = require('react-menu-bar');

var MyMenuBar = React.createClass({
  render: function () {
    return (
      <MenuBar onSelect={this.onSelect}>
        <MenuItem label="File">
          <Menu>
            <MenuItem key="new-window" label="New Window" />
            <MenuItem key="new-file" label="New File" />
          </Menu>
        </MenuItem>

        <MenuItem label="Edit">
          <Menu>
            <MenuItem key="undo" label="Undo" />
            <MenuItem key="redo" label="Redo" />
            <Separator />
            <MenuItem label="Find">
              <Menu>
                <MenuItem key="find" label="Find..." />
                <MenuItem key="find-next" label="Find Next" />
                <MenuItem key="find-previous" label="Find Previous" />
                <MenuItem key="use-selection-for-find" label="Use Selection For Find" />
              </Menu>
            </MenuItem>
          </Menu>
        </MenuItem>

        <MenuItem label="Help">
          <Menu>
            <MenuItem key="terms-of-use" label="Terms of Use" />
            <MenuItem key="documentation" label="Documentation" />
            <Separator />
            <MenuItem key="release-notes" label="Release Notes" />
          </Menu>
        </MenuItem>
      </MenuBar>
    );
  },

  onSelect: function (key) {
    console.log('Selected: %s, key);
  }
});
```

[1]: https://facebook.github.io/react/
