import React from 'react';

export default function InterestIconSvg({ type }) {
  const strokeColor = 'currentColor';
  const strokeWidth = 1.2;

  switch (type) {
    case 'technology':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          width="100%"
          height="100%"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <line x1="6" y1="13" x2="18" y2="13" strokeDasharray="1 1" />
        </svg>
      );
    case 'scifi':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          width="100%"
          height="100%"
        >
          <ellipse cx="12" cy="12" rx="10" ry="3" transform="rotate(-15 12 12)" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="6" cy="7" r="0.8" fill="currentColor" />
          <circle cx="17" cy="16" r="0.5" fill="currentColor" />
        </svg>
      );
    case 'music':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          width="100%"
          height="100%"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    case 'biking':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          width="100%"
          height="100%"
        >
          <circle cx="5.5" cy="17.5" r="2.5" />
          <circle cx="18.5" cy="17.5" r="2.5" />
          <path d="M15 17.5L12 11.5L8 17.5" />
          <path d="M12 11.5L16 6.5H20" />
          <path d="M12 11.5H7.5L5.5 17.5" />
        </svg>
      );
    case 'flag_football':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          width="100%"
          height="100%"
        >
          <path d="M3 21C14.5 21 21 14.5 21 3" />
          <path d="M3 21C3 9.5 9.5 3 21 3" />
          <line x1="7.5" y1="16.5" x2="16.5" y2="7.5" />
          <line x1="10.5" y1="11" x2="13.5" y2="14" />
          <line x1="12" y1="9.5" x2="15" y2="12.5" />
          <line x1="9" y1="12.5" x2="12" y2="15.5" />
        </svg>
      );
    case 'traveling':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          width="100%"
          height="100%"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case 'neurodiversity':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          width="100%"
          height="100%"
        >
          <path d="M12 12C9 7 3 7 3 12C3 17 9 17 12 12C15 7 21 7 21 12C21 17 15 17 12 12Z" />
        </svg>
      );
    case 'trains':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          width="100%"
          height="100%"
        >
          <rect x="4" y="3" width="16" height="14" rx="2" />
          <rect x="6" y="6" width="12" height="6" />
          <circle cx="8" cy="15" r="0.8" fill="currentColor" />
          <circle cx="16" cy="15" r="0.8" fill="currentColor" />
          <path d="M4 17l-2 2v2h20v-2l-2-2H4z" />
        </svg>
      );
    default:
      return null;
  }
}
