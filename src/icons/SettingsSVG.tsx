import React from 'react';

const SettingsSVG: React.FC<React.SVGAttributes<SVGElement>> = ({ width = '12', height = '12' }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 12 10" fill="inherit" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.67559 1.39922C4.18425 1.39922 3.78594 1.79753 3.78594 2.28887C3.78594 2.78022 4.18425 3.17853 4.67559 3.17853C5.16694 3.17853 5.56525 2.78022 5.56525 2.28887C5.56525 1.79753 5.16694 1.39922 4.67559 1.39922ZM1.19961 2.88867H2.67329C2.93107 3.75043 3.72998 4.37853 4.67559 4.37853C5.62121 4.37853 6.42012 3.75043 6.67789 2.88867H10.7996C11.131 2.88867 11.3996 2.62004 11.3996 2.28867C11.3996 1.9573 11.131 1.68867 10.7996 1.68867H6.67777C6.41987 0.827121 5.62106 0.199219 4.67559 0.199219C3.73013 0.199219 2.93132 0.827121 2.67342 1.68867H1.19961C0.868239 1.68867 0.599609 1.9573 0.599609 2.28867C0.599609 2.62004 0.868239 2.88867 1.19961 2.88867ZM0.599609 7.58555C0.599609 7.25418 0.868239 6.98555 1.19961 6.98555H5.98367C6.24157 6.124 7.04038 5.49609 7.98585 5.49609C8.93131 5.49609 9.73012 6.124 9.98802 6.98555H10.7995C11.1309 6.98555 11.3995 7.25418 11.3995 7.58555C11.3995 7.91692 11.1309 8.18555 10.7995 8.18555H9.98814C9.73037 9.04731 8.93146 9.6754 7.98585 9.6754C7.04023 9.6754 6.24132 9.04731 5.98355 8.18555H1.19961C0.868239 8.18555 0.599609 7.91692 0.599609 7.58555ZM7.09619 7.58575C7.09619 7.09441 7.4945 6.69609 7.98585 6.69609C8.47719 6.69609 8.8755 7.09441 8.8755 7.58575C8.8755 8.07709 8.47719 8.4754 7.98585 8.4754C7.4945 8.4754 7.09619 8.07709 7.09619 7.58575Z"
        fill="inherit"
        fillOpacity="0.5"
      />
    </svg>
  );
};

export default SettingsSVG;
