'use client';
import * as React from 'react';
import { Menu } from '@base-ui/react/menu';
import { Dialog } from '@base-ui/react/dialog';
import { Switch } from '@base-ui/react/switch';

export default function Home() {
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
