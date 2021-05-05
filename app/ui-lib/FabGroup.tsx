import React, { useState } from 'react';
import { FAB, Portal } from 'react-native-paper';

interface FabGroupProps {
  icon?: string;
  openIcon?: string;
  closeIcon?: string;
  actions: any[];
}

function FabGroupX({ icon, openIcon, closeIcon, actions }: FabGroupProps) {
  const [open, setOpen] = useState(false);

  return (
    <Portal>
      <FAB.Group
        visible
        open={open}
        icon={icon ?? open ? openIcon! : closeIcon!}
        actions={actions}
        onStateChange={({ open: v }) => setOpen(v)}
        style={{ padding: 15 }}
      />
    </Portal>
  );
}

export default FabGroupX;
