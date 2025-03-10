import React, { useEffect, useState } from 'react';
import { Box, IconButton, Typography, Link } from '@mui/material';

import CloseIcon from '../icons/CloseIcon';
import JupiterLogo from '../icons/JupiterLogo';
import MenuIcon from '../icons/MenuIcon';
import HeaderLinks from './HeaderLinks';
import HeaderLinksMobile from './HeaderLinksMobile';

const AppHeader: React.FC<{}> = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const handleToggleMenu = () => setOpenMobileMenu(!openMobileMenu);

  useEffect(() => {
    const body = document.querySelector('body');
    if (openMobileMenu) {
      body!.style.overflow = 'hidden';
    } else {
      body!.style.overflow = '';
    }
  }, [openMobileMenu]);

  return (
    <>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        width: '100%', 
        bgcolor: 'rgba(0, 0, 0, 0.35)'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          flex: 1, 
          p: 4 
        }}>
          <IconButton 
            onClick={handleToggleMenu} 
            sx={{ 
              width: '1.5rem', 
              mr: 3, 
              display: { xs: 'block', md: 'none' }, 
              color: 'white' 
            }}
          >
            {openMobileMenu ? <CloseIcon /> : <MenuIcon />}
          </IconButton>

          <Link href="https://jup.ag" sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              fontSize: '1.125rem', 
              fontWeight: 600, 
              color: 'white' 
            }}>
              <JupiterLogo />
              <Box component="span" sx={{ ml: 3 }}>Jupiter</Box>
            </Typography>
          </Link>
        </Box>

        <HeaderLinks />

        <Box sx={{ flex: 1 }} />
      </Box>

      {openMobileMenu && (
        <Box
          sx={{
            height: 'calc(100vh - 70px)',
            zIndex: 60,
            display: { xs: 'block', md: 'none' },
            position: 'fixed',
            top: '60px',
            left: 0,
            width: '100%',
            bgcolor: 'rgba(62,62,69,0.85)',
            backdropFilter: 'blur(20px)'
          }}
          onClick={handleToggleMenu}
        >
          <HeaderLinksMobile />
        </Box>
      )}
    </>
  );
};

export default AppHeader;
