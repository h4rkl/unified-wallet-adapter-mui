import React from 'react'
import { GlobalStyles as MuiGlobalStyles } from '@mui/material'

const GlobalStyles = () => {
  return (
    <MuiGlobalStyles
      styles={{
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        'html, body': {
          width: '100%',
          height: '100%',
        },
        body: {
          fontFamily: '"Inter", sans-serif',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        a: {
          textDecoration: 'none',
          color: 'inherit',
        },
        '#__next': {
          width: '100%',
          height: '100%',
        },
      }}
    />
  )
}

export default GlobalStyles
