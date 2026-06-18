import React from 'react';

export default function InterestIconSvg({ type }) {
  if (!type) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      className="svg-icon-full"
    >
      <use href={`/assets/svgs/interest_${type}.svg#icon`} />
    </svg>
  );
}

