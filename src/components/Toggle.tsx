import { Box, Button } from "@mui/material";

type Props = {
  active: boolean;
  onClick: (active: boolean) => void;
  className?: string;
  dotClassName?: string;
};

const Toggle = ({ active, onClick, className, dotClassName }: Props) => {
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
        bgcolor: active ? 'jupiter.jungleGreen' : '#010101',
      }}
      className={className}
      onClick={() => onClick(!active)}
    >
      <Box
        sx={{
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          boxShadow: 'md',
          transform: active ? 'translateX(100%)' : 'none',
          transition: 'transform 300ms ease-in-out',
          bgcolor: 'white',
        }}
        className={dotClassName}
      />
    </Button>
  );
};

export default Toggle;
