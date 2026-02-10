import { Sandpack } from '@codesandbox/sandpack-react';

const files = {
  '/App.tsx': `import './App.css';
import * as React from 'react';
import { Menu } from '@base-ui/react/menu';
import { Dialog } from '@base-ui/react/dialog';
import { Switch } from '@base-ui/react/switch';

export function App() {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <div className="app-container">
      <h1>Base UI Demo</h1>
      <p>Testing headless components from base-ui.com</p>

      <section className="demo-section">
        <h2>Menu</h2>
        <Menu.Root>
          <Menu.Trigger className="menu-trigger">Open Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner className="menu-positioner">
              <Menu.Popup className="menu-popup">
                <Menu.Item className="menu-item">New File</Menu.Item>
                <Menu.Item className="menu-item">Open File</Menu.Item>
                <Menu.Item className="menu-item">Save</Menu.Item>
                <Menu.Separator className="menu-separator" />
                <Menu.Item className="menu-item">Settings</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </section>

      <section className="demo-section">
        <h2>Switch</h2>
        <div className="switch-demo">
          <Switch.Root className="switch-root" defaultChecked>
            <Switch.Thumb className="switch-thumb" />
          </Switch.Root>
          <span>Enable notifications</span>
        </div>
        <div className="switch-demo">
          <Switch.Root className="switch-root">
            <Switch.Thumb className="switch-thumb" />
          </Switch.Root>
          <span>Dark mode</span>
        </div>
      </section>

      <section className="demo-section">
        <h2>Dialog</h2>
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
          <Dialog.Trigger className="dialog-trigger">Open Dialog</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop className="dialog-backdrop" />
            <Dialog.Popup className="dialog-popup">
              <Dialog.Title className="dialog-title">Welcome!</Dialog.Title>
              <Dialog.Description className="dialog-description">
                This is a Base UI Dialog component. It's fully accessible and
                customizable with your own styles.
              </Dialog.Description>
              <div className="dialog-actions">
                <Dialog.Close className="dialog-close">Close</Dialog.Close>
                <button className="dialog-confirm" onClick={() => setDialogOpen(false)}>
                  Confirm
                </button>
              </div>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </section>
    </div>
  );
}
`,
  '/Material.tsx': `import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export function App() {
  return (
    <Stack direction="row" spacing={2}>
      <Button>Primary</Button>
      <Button disabled>Disabled</Button>
      <Button href="#text-buttons">Link</Button>
    </Stack>
  );
}`,
  '/App.css': `/* Base styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  color-scheme: light dark;
  font-family: system-ui, -apple-system, sans-serif;
}

body {
  min-height: 100vh;
  padding: 2rem;
  background: #f5f5f5;
}

@media (prefers-color-scheme: dark) {
  body {
    background: #1a1a1a;
    color: #fff;
  }
}

.app-container {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 0.5rem;
}

h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.demo-section {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@media (prefers-color-scheme: dark) {
  .demo-section {
    background: #2a2a2a;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
}

/* Menu styles */
.menu-trigger {
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.menu-trigger:hover {
  background: #2563eb;
}

.menu-positioner {
  z-index: 1000;
}

.menu-popup {
  background: white;
  border-radius: 8px;
  padding: 0.5rem;
  min-width: 160px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  outline: none;
}

@media (prefers-color-scheme: dark) {
  .menu-popup {
    background: #333;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  }
}

.menu-item {
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  outline: none;
}

.menu-item:hover,
.menu-item:focus {
  background: #f0f0f0;
}

@media (prefers-color-scheme: dark) {
  .menu-item:hover,
  .menu-item:focus {
    background: #444;
  }
}

.menu-separator {
  height: 1px;
  background: #e5e5e5;
  margin: 0.5rem 0;
}

@media (prefers-color-scheme: dark) {
  .menu-separator {
    background: #444;
  }
}

/* Switch styles */
.switch-demo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.switch-demo:last-child {
  margin-bottom: 0;
}

.switch-root {
  width: 44px;
  height: 24px;
  background: #ccc;
  border-radius: 12px;
  padding: 2px;
  cursor: pointer;
  border: none;
  transition: background 0.2s;
}

.switch-root[data-checked] {
  background: #3b82f6;
}

.switch-thumb {
  display: block;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.switch-root[data-checked] .switch-thumb {
  transform: translateX(20px);
}

/* Dialog styles */
.dialog-trigger {
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.dialog-trigger:hover {
  background: #059669;
}

.dialog-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.dialog-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  width: 90%;
  max-width: 400px;
  z-index: 1000;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  outline: none;
}

@media (prefers-color-scheme: dark) {
  .dialog-popup {
    background: #2a2a2a;
  }
}

.dialog-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.dialog-description {
  color: #666;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

@media (prefers-color-scheme: dark) {
  .dialog-description {
    color: #aaa;
  }
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.dialog-close,
.dialog-confirm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.dialog-close {
  background: #e5e5e5;
  border: none;
  color: #333;
}

.dialog-close:hover {
  background: #d4d4d4;
}

@media (prefers-color-scheme: dark) {
  .dialog-close {
    background: #444;
    color: #fff;
  }
  
  .dialog-close:hover {
    background: #555;
  }
}

.dialog-confirm {
  background: #3b82f6;
  border: none;
  color: white;
}

.dialog-confirm:hover {
  background: #2563eb;
}
`,
  '/index.tsx': `import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { App } from './Material';

let container = document.getElementById("root")!;
let root = createRoot(container)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
`,
};

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Sandpack
        template="react-ts"
        theme="dark"
        options={{
          showNavigator: true,
          showTabs: true,
          editorHeight: '100vh',
          bundlerTimeOut: 500000,
        }}
        customSetup={{
          dependencies: {
            '@base-ui/react': 'latest',
            '@emotion/react': 'latest',
            '@emotion/styled': 'latest',
            '@mui/material': 'latest',
            react: '19.2.4',
            'react-dom': '19.2.4',
          },
        }}
        files={files}
      />
    </div>
  );
}

export default App;
