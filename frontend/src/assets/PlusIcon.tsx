import React from "react";

function PlusIcon({ classes }: { classes: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`${classes}`}
      stroke="currentColor"
      strokeWidth="0.75"
      strokeLinecap="round"
    >
      <rect x="4.5" y="4.5" width="15" height="15" rx="2" />
      <path d="M12 8 L12 16" />
      <path d="M8 12 L16 12" />
    </svg>
  );
}

export default PlusIcon;
