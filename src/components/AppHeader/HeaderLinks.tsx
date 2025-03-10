import { Box, Link } from '@mui/material';

import SwapIcon from '../icons/SwapIcon';
import RepoLogo from '../icons/RepoLogo';
import DiscordIcon from '../icons/DiscordIcon';

const HeaderLink = ({
  href,
  isActive,
  title,
  icon,
  external = false,
}: {
  href: string;
  isActive: boolean;
  title: string | React.ReactNode;
  icon: React.ReactNode;
  external?: boolean;
}) => {
  return (
    <Link
      href={href}
      sx={{
        display: 'flex',
        alignItems: 'center',
        fontWeight: 600,
        color: isActive ? 'v3-primary' : 'rgba(255, 255, 255, 0.5)',
        '&:hover': { color: 'white' },
        fill: 'currentColor',
        height: '60px',
        px: 4,
        ...(isActive && { bgcolor: 'v3-bg' })
      }}
      {...(external
        ? {
            target: '_blank',
            rel: 'noopener noreferrer',
          }
        : {})}
    >
      <Box sx={{ width: '1.25rem' }}>{icon}</Box>
      <Box sx={{ ml: 2, whiteSpace: 'nowrap' }}>{title}</Box>
    </Link>
  );
};

const HeaderLinks = () => {
  return (
    <Box sx={{ 
      flex: 1, 
      justifyContent: 'center', 
      display: { xs: 'none', md: 'flex' }, 
      fontSize: '0.875rem', 
      height: '100%' 
    }}>
      <HeaderLink href="/" isActive title={'Demo'} icon={<SwapIcon width="20" height="20" />} />
      <HeaderLink
        href="https://github.com/TeamRaccoons/wallet-kit"
        isActive={false}
        external
        title={'Repo'}
        icon={<RepoLogo width="20" height="20" />}
      />
      <HeaderLink
        href="https://discord.gg/jup"
        isActive={false}
        external
        title={'Discord'}
        icon={<DiscordIcon width="20" height="20" />}
      />
    </Box>
  );
};

export default HeaderLinks;
