import React, { PropsWithChildren, useCallback, useState, useEffect } from 'react';
import { Dialog } from '@mui/material';

const ModalDialog: React.FC<{ open: boolean; onClose: () => void } & PropsWithChildren> = ({
  open,
  onClose: onCloseFunc,
  children,
}) => {
  const [isLocalOpen, setIsLocalOpen] = useState(false);

  useEffect(() => {
    if (!isLocalOpen) setIsLocalOpen(open);

    if (isLocalOpen && !open) {
      setTimeout(() => {
        setIsLocalOpen(open);
      }, 150);
    }
  }, [open, isLocalOpen]);

  const onClose = useCallback(() => {
    onCloseFunc();
  }, [onCloseFunc]);

  if (!isLocalOpen) return null;
  return (
    <Dialog open={open} onClose={onClose}>
      {children}
    </Dialog>
  );
};

export default ModalDialog;
