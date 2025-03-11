import { Box, Typography } from '@mui/material';
import { IWalletProps } from "../contexts/UnifiedWalletProvider";

const PreviewFunctionality = ({ title, walletProps }: { title: string, walletProps?: IWalletProps }) => {
  return (
    <Box>
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
