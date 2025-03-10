import { SvgIcon, SvgIconProps } from '@mui/material';

const ChevronUpIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.292893 5.70711C0.683416 6.09763 1.31658 6.09763 1.7071 5.70711L4.99999 2.41421L8.29288 5.70711C8.6834 6.09763 9.31657 6.09763 9.70709 5.70711C10.0976 5.31658 10.0976 4.68342 9.70709 4.29289L5.7071 0.292893C5.31657 -0.097631 4.68341 -0.097631 4.29289 0.292893L0.292893 4.29289C-0.0976309 4.68342 -0.0976309 5.31658 0.292893 5.70711Z"
      fill="currentColor"
    />
  </SvgIcon>
);

export default ChevronUpIcon;
