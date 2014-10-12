var React     = require('react');
var MenuBar   = require('../').MenuBar;
var Menu      = require('../').Menu;
var MenuItem  = require('../').MenuItem;
var Separator = require('../').Separator;

function onSelect (key) {
  console.log('Selected key: %s', key);
}

React.renderComponent(
  <MenuBar onSelect={onSelect}>
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
  </MenuBar>,
  document.getElementById('content')
);

window.React = React;
