import React from 'react';

export default function SocialIconSvg({ brand }) {
  const brandName = brand ? brand.toLowerCase() : '';
  if (!brandName) return null;

  return (
    <span 
      className={`social-icon-mask social-icon-mask-${brandName}`} 
      aria-hidden="true"
    />
  );
}
