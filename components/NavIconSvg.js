import React from 'react';

export default function NavIconSvg({ type }) {
  if (!type) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      <use href={`/assets/svgs/nav_${type}.svg#icon`} />
    </svg>
  );
}
