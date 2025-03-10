import { SvgIcon, SvgIconProps } from '@mui/material';

const ChevronLeftIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path 
      d="M7 1L1 7L7 13" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </SvgIcon>
);

export default ChevronLeftIcon;
