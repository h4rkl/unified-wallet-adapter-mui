import { Box, Typography, Paper, Divider } from '@mui/material';
import { IWalletProps } from "../contexts/UnifiedWalletProvider";

const PreviewFunctionality = ({ title, walletProps }: { title: string, walletProps?: IWalletProps }) => {
  return (
    <Box>
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 600, 
          fontSize: '1.25rem', 
          mb: 2,
          pb: 1,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        {title}
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        '& > *:not(:first-of-type)': { mt: 3 },
        width: '100%'
      }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
          <Typography sx={{ 
            fontWeight: 500, 
            color: 'text.secondary',
            minWidth: '120px'
          }}>
            Wallet:
          </Typography>
          <Typography sx={{ 
            fontWeight: 600,
            backgroundColor: 'action.hover',
            borderRadius: 1,
            px: 1.5,
            py: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {walletProps?.wallet?.adapter.name || 'Not connected'}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
          <Typography sx={{ 
            fontWeight: 500, 
            color: 'text.secondary',
            minWidth: '120px'
          }}>
            PublicKey:
          </Typography>
          <Typography 
            sx={{ 
              fontWeight: 600,
              backgroundColor: 'action.hover',
              borderRadius: 1,
              px: 1.5,
              py: 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontFamily: 'monospace'
            }}
          >
            {walletProps?.publicKey?.toString() || 'Not available'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PreviewFunctionality;
