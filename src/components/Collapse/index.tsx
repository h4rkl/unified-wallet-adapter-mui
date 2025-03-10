import React, { HTMLAttributes, PropsWithChildren, useEffect, useState } from 'react';
import { Box } from '@mui/material';

const Collapse: React.FC<
  PropsWithChildren<{
    className?: HTMLAttributes<HTMLDivElement>['className'];
    height: string | number;
    maxHeight: string | number;
    expanded: boolean;
  }>
> = ({ children, className = '', height, maxHeight, expanded }) => {
  const [localHeight, setLocalHeight] = useState<string | number>(height);

  useEffect(() => {
    if (expanded) setLocalHeight(maxHeight);
    else setLocalHeight(height);
  }, [height, maxHeight, expanded]);

  return (
    <Box
      className={className}
      sx={{
        transition: 'all 0.2s',
        overflow: 'hidden',
        animation: expanded ? 'fadeIn 0.3s ease-in-out' : 'fadeOut 0.3s ease-in-out',
        height: localHeight,
        maxHeight
      }}
    >
      {children}
    </Box>
  );
};

export default Collapse;
