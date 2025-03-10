import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react'
import { Box, Dialog } from '@mui/material';

const ModalDialog: React.FC<{ open: boolean; onClose: () => void } & PropsWithChildren> = ({ open, onClose: onCloseFunc, children }) => {
  const ref = useRef<HTMLDialogElement>(null);

  const [isLocalOpen, setIsLocalOpen] = useState(false);
  useEffect(() => {
    if (!isLocalOpen) setIsLocalOpen(open);

    if (isLocalOpen) {
      setTimeout(() => {
        setIsLocalOpen(open);
      }, 150);
    }
  }, [open])

  const onClose = useCallback(() => {
    ref.current?.close();
    onCloseFunc();
  }, [onCloseFunc, ref]);

  useEffect(() => {
    if (ref.current) {
      if (isLocalOpen) {
        if (!ref.current.open) {
          ref.current.showModal();
        }
      } else {
        ref.current.close();
      }
    }

    // Make sure when `ESC` (browser default) is clicked, we close the dialog
    if (isLocalOpen) {
      const refNode = ref.current;
      refNode?.addEventListener('close', onClose);
      return () => {
        refNode?.removeEventListener('close', onClose);
      };
    }
  }, [onClose, isLocalOpen]);

  if (!isLocalOpen) return null;
  return (
    <Dialog
      open={isLocalOpen}
      onClose={onCloseFunc}
      sx={{
        '& .MuiDialog-paper': {
          margin: 0,
          width: '100%',
          height: '100%',
          maxWidth: 'none',
          maxHeight: 'none',
          bgcolor: 'transparent',
          boxShadow: 'none',
        },
        '& .MuiBackdrop-root': {
          bgcolor: 'rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(4px)',
        },
        zIndex: 50,
        animation: isLocalOpen && !open ? 'fadeOut 0.3s' : 'fadeIn 0.3s',
        opacity: isLocalOpen && !open ? 0 : 1,
      }}
    >
      {children}
    </Dialog>
  )
}

export default ModalDialog