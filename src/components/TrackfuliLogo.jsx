import React from 'react';
import logoSvg from '../assets/logo.svg';

export default function TrackfuliLogo() {
  return (
    <img 
      src={logoSvg} 
      alt="Trackfuli Logo" 
      style={{
        width: 150,
        height: 33,
        objectFit: 'contain'
      }}
    />
  );
}
