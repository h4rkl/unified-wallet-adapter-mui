import React, { useEffect, useState } from 'react';
import 'twin.macro'

import CloseIcon from '../../icons/CloseIcon';
import JupiterLogo from '../../icons/JupiterLogo';
import MenuIcon from '../../icons/MenuIcon';
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
      <div tw="flex items-center justify-between w-full bg-black/[.35]">
        <div tw="flex items-center flex-1 p-4">
          <button onClick={handleToggleMenu} type="button" tw="w-6 mr-3 md:hidden text-white">
            {/* @ts-ignore */}
            {openMobileMenu ? <CloseIcon /> : <MenuIcon />}
          </button>

          <a href="https://jup.ag" tw="flex-1">
            <h1 tw="flex items-center text-lg font-semibold text-white">
              {/* @ts-ignore */}
              <JupiterLogo />
              <span tw="ml-3">Jupiter</span>
            </h1>
          </a>
        </div>

        <HeaderLinks />

        <div tw="flex-1" />
      </div>

      {openMobileMenu && (
        <div
          style={{
            height: 'calc(100vh - 70px)',
          }}
          tw="z-[60] md:hidden fixed top-[60px] left-0 w-full bg-[rgba(62,62,69,0.85)] backdrop-blur-[20px]"
          onClick={handleToggleMenu}
        >
          {/* @ts-ignore */}
          <HeaderLinksMobile />
        </div>
      )}
    </>
  );
};

export default AppHeader;
