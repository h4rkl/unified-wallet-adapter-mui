import React, { useMemo } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import Collapse from '../Collapse';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import ChevronUpIcon from '../icons/ChevronUpIcon';
import { UnifiedWalletProvider } from '../../contexts/UnifiedWalletProvider';

import prettier from 'prettier/standalone';
import prettierPluginBabel from 'prettier/plugins/babel';
import prettierPluginEstree from 'prettier/plugins/estree';
import prettierPluginTypescript from 'prettier/plugins/typescript';

const CodeBlocks: React.FC<{ params: Omit<Parameters<typeof UnifiedWalletProvider>[0], 'children'>, unparsedWalletDeclarationString: string, unparsedWalletPropsString: string }> = ({
  params,
  unparsedWalletDeclarationString,
  unparsedWalletPropsString,
}) => {
  const USE_WALLET_SNIPPET = useMemo(() => `import { UnifiedWalletProvider } from '@jup-ag/wallet-adapter';
  const App = () => {
    ${unparsedWalletDeclarationString || ''}
    return (
      <UnifiedWalletProvider
        ${unparsedWalletPropsString}
        ${Object.keys(params)
          .filter((key) => key !== 'wallets')
          .map((key) => {
            const value = JSON.stringify(params[key], null, 2);
            return `${key}={${value}}`;
          })
          .join('\n\t\t')}
      >
        <UnifiedWalletButton />
      </UnifiedWalletProvider>
    )
  }
`, [params]);

  const [snippet, setSnippet] = useState(``);

  useEffect(() => {
    prettier
      .format(USE_WALLET_SNIPPET, { parser: 'typescript', plugins: [prettierPluginBabel, prettierPluginEstree, prettierPluginTypescript] })
      .then((res) => {
        setSnippet(res);
      });
  }, [USE_WALLET_SNIPPET]);

  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }, [isCopied]);

  const copyToClipboard = () => {
    if (isCopied) return;
    navigator.clipboard.writeText(snippet);
    setIsCopied(true);
  };

  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Collapse height={0} maxHeight={'auto'} expanded={expanded}>
        <Box 
          className='hideScrollbar' 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            mt: 4, 
            color: 'white', 
            overflow: 'scroll' 
          }}
        >
          <Box sx={{ position: 'relative', width: '100%', maxWidth: '48rem', px: { xs: 4, md: 0 } }}>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
              <Typography sx={{ color: 'white', alignSelf: 'flex-start', pb: 2, fontWeight: 600 }}>
                Code snippet
              </Typography>
              <Button
                sx={{
                  fontSize: '0.75rem',
                  color: 'white',
                  border: '1px solid',
                  borderRadius: '0.75rem',
                  px: 2,
                  py: 1,
                  opacity: isCopied ? 1 : 0.5,
                  '&:hover': { opacity: isCopied ? 1 : 1 },
                  cursor: isCopied ? 'wait' : 'pointer'
                }}
                onClick={copyToClipboard}
              >
                {isCopied ? 'Copied!' : 'Copy to clipboard'}
              </Button>
            </Box>

            <SyntaxHighlighter wrapLines language="typescript" showLineNumbers style={vs2015}>
              {snippet}
            </SyntaxHighlighter>
          </Box>
        </Box>
      </Collapse>

      <Box sx={{ mt: 2, width: '100%', color: 'white', fontWeight: 600 }}>
        <Button
          type="button"
          sx={{
            width: '100%',
            fontSize: '0.875rem',
            color: 'white',
            p: 2,
            opacity: 0.5,
            '&:hover': { opacity: 1 }
          }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? `Hide Snippet` : `Show snippet`}
          {expanded ? <ChevronUpIcon sx={{ display: 'inline-block', ml: 2 }} /> : <ChevronDownIcon sx={{ display: 'inline-block', ml: 2 }} />}
        </Button>
      </Box>
    </>
  );
};

export default CodeBlocks;
