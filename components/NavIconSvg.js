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
      className="svg-icon-full"
    >
      <use href={`/assets/svgs/nav_${type}.svg#icon`} />
    </svg>
  );
}
