const React = require('react');
const { renderToString } = require('react-dom/server');
const { Menu } = require('@base-ui/react/menu');
const { Dialog } = require('@base-ui/react/dialog');
const { Switch } = require('@base-ui/react/switch');

function App() {
  return React.createElement(
    'div',
    { className: 'app-container' },
    React.createElement('h1', null, 'Base UI Demo'),
    React.createElement('p', null, 'Testing headless components from base-ui.com'),

    // Menu Section
    React.createElement(
      'section',
      { className: 'demo-section' },
      React.createElement('h2', null, 'Menu'),
      React.createElement(
        Menu.Root,
        null,
        React.createElement(Menu.Trigger, { className: 'menu-trigger' }, 'Open Menu'),
        React.createElement(
          Menu.Portal,
          null,
          React.createElement(
            Menu.Positioner,
            { className: 'menu-positioner' },
            React.createElement(
              Menu.Popup,
              { className: 'menu-popup' },
              React.createElement(Menu.Item, { className: 'menu-item' }, 'New File'),
              React.createElement(Menu.Item, { className: 'menu-item' }, 'Open File'),
              React.createElement(Menu.Item, { className: 'menu-item' }, 'Save'),
              React.createElement(Menu.Separator, { className: 'menu-separator' }),
              React.createElement(Menu.Item, { className: 'menu-item' }, 'Settings'),
            ),
          ),
        ),
      ),
    ),

    // Switch Section
    React.createElement(
      'section',
      { className: 'demo-section' },
      React.createElement('h2', null, 'Switch'),
      React.createElement(
        'div',
        { className: 'switch-demo' },
        React.createElement(
          Switch.Root,
          { className: 'switch-root', defaultChecked: true },
          React.createElement(Switch.Thumb, { className: 'switch-thumb' }),
        ),
        React.createElement('span', null, 'Enable notifications'),
      ),
      React.createElement(
        'div',
        { className: 'switch-demo' },
        React.createElement(
          Switch.Root,
          { className: 'switch-root' },
          React.createElement(Switch.Thumb, { className: 'switch-thumb' }),
        ),
        React.createElement('span', null, 'Dark mode'),
      ),
    ),

    // Dialog Section
    React.createElement(
      'section',
      { className: 'demo-section' },
      React.createElement('h2', null, 'Dialog'),
      React.createElement(
        Dialog.Root,
        null,
        React.createElement(Dialog.Trigger, { className: 'dialog-trigger' }, 'Open Dialog'),
        React.createElement(
          Dialog.Portal,
          null,
          React.createElement(Dialog.Backdrop, { className: 'dialog-backdrop' }),
          React.createElement(
            Dialog.Popup,
            { className: 'dialog-popup' },
            React.createElement(Dialog.Title, { className: 'dialog-title' }, 'Welcome!'),
            React.createElement(
              Dialog.Description,
              { className: 'dialog-description' },
              "This is a Base UI Dialog component. It's fully accessible and customizable with your own styles.",
            ),
            React.createElement(
              'div',
              { className: 'dialog-actions' },
              React.createElement(Dialog.Close, { className: 'dialog-close' }, 'Close'),
              React.createElement('button', { className: 'dialog-confirm' }, 'Confirm'),
            ),
          ),
        ),
      ),
    ),
  );
}

const html = renderToString(React.createElement(App));
console.log(html);
