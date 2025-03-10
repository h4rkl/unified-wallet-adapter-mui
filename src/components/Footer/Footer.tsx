import Link from 'next/link';
import { Box } from '@mui/material';

import DiscordIcon from '../icons/DiscordIcon';
import TwitterIcon from '../icons/TwitterIcon';

const Footer = () => {
  return (
    <Box component="footer" sx={{ 
      display: 'flex', 
      textAlign: 'center', 
      justifyContent: 'center', 
      alignItems: 'center', 
      p: 2.5, 
      fontSize: '0.75rem', 
      color: 'white', 
      '& > *:not(:first-of-type)': { ml: 2 }
    }}>
      <Link href="https://twitter.com/jupiterexchange" target="_blank">
        <TwitterIcon />
      </Link>

      <Link href="https://discord.gg/jup" target="_blank">
        <DiscordIcon />
      </Link>
    </Box>
  );
};

export default Footer;
