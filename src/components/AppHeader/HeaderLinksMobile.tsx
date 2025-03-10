import React from 'react';
import { Box, Link, Typography } from '@mui/material';

import DiscordIcon from '../icons/DiscordIcon';
import RepoLogo from '../icons/RepoLogo';
import SwapIcon from '../icons/SwapIcon';

const HeaderLink: React.FC<{
  external?: boolean;
  href: string;
  icon: React.ReactNode;
  label: string | React.ReactNode;
}> = ({ external, href, icon, label }) => {
  return (
    <Link
      href={href}
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        px: 5,
        py: 4,
        borderRadius: '0.75rem',
      }}
      {...(external
        ? {
            target: '_blank',
            rel: 'noopener noreferrer',
          }
        : {})}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '2.25rem', 
        width: '2.25rem', 
        borderRadius: '50%', 
        color: 'rgba(255, 255, 255, 0.5)', 
        fill: 'currentColor', 
        bgcolor: 'rgba(0, 0, 0, 0.25)' 
      }}>
        {icon}
      </Box>
      <Typography sx={{ ml: 5, fontWeight: 500 }}>{label}</Typography>
    </Link>
  );
};

const HeaderLinksMobile: React.FC = () => {
  return (
    <Box sx={{ 
      px: 5, 
      py: 4, 
      fontSize: '1rem', 
      color: 'white', 
      '& > *:not(:first-of-type)': { mt: 2 }
    }}>
      <HeaderLink href="/" label={'Demo'} icon={<SwapIcon width="20" height="20" />} />
      <HeaderLink
        href="https://github.com/jup-ag/terminal"
        external
        label={'Repo'}
        icon={<RepoLogo width="20" height="20" />}
      />
      <HeaderLink
        href="https://discord.gg/jup"
        external
        label={'Discord'}
        icon={<DiscordIcon width="20" height="20" />}
      />
    </Box>
  );
};

export default HeaderLinksMobile;
