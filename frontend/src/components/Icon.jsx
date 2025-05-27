import React from 'react';
import icon from '../../public/icon.png';

const Icon = ({
  className = '',
  backgroundColor = 'transparent',
  borderRadius = '0',
}) => {
  const style = {
    backgroundColor,
    borderRadius,
  };

  return (
    <div className={`${className}`} style={style}>
      <img src={icon} alt="Icon" className="w-full h-full object-contain" />
    </div>
  );
};

export default Icon;