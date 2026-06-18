import React from 'react';

const SVG_BASE = '/assets/svgs/';

export default function InterestVisuals({ svgType }) {
  if (!svgType) return null;

  return (
    <img
      src={`${SVG_BASE}${svgType}.svg?v=3`}
      alt={svgType}
      width="100%"
      className="interest-visuals-img"
    />
  );
}
