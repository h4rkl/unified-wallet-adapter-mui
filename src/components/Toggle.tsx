import { Box, Button } from "@mui/material";

type Props = {
  active: boolean;
  onClick: (active: boolean) => void;
  className?: string;
  dotClassName?: string;
};

const Toggle = ({ active, onClick }: Props) => {
  return (
    <Button
      type="button"
      sx={{
        width: '2.5rem',
        height: '22px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '9999px',
        p: '1px',
        cursor: 'pointer',
        bgcolor: (theme) => theme.palette.mode === 'light' ? '#010101' : '#010101',
      }}
      onClick={() => onClick(!active)}
    >
      <Box
        sx={{
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          boxShadow: (theme) => theme.shadows[1],
          transform: active ? 'translateX(100%)' : 'none',
          transition: (theme) => theme.transitions.create('transform', {
            duration: theme.transitions.duration.standard,
          }),
          bgcolor: (theme) => theme.palette.common.white,
        }}
      />
    </Button>
  );
};

export default Toggle;
