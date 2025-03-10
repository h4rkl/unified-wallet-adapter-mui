import { Box, Typography } from '@mui/material';
import { IWalletProps } from "../contexts/UnifiedWalletProvider";

const PreviewFunctionality = ({ title, walletProps }: { title: string, walletProps?: IWalletProps }) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      mt: 4,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      p: 4,
      bgcolor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 2,
      color: 'white',
      fontSize: '0.75rem'
    }}>
      <Typography sx={{ fontWeight: 600, fontSize: '1.125rem', mb: 4 }}>{title}</Typography>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        '& > *:not(:first-of-type)': { mt: 4 },
        width: '100%'
      }}>
        <Box>
          <Box>
            Wallet:
          </Box>
          <Box>
            {walletProps?.wallet?.adapter.name}
          </Box>
        </Box>

        <Box>
          <Box>
            PublicKey:
          </Box>
          <Box>
            {walletProps?.publicKey?.toString()}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PreviewFunctionality;
