import React from "react";
import { twMerge } from "tailwind-merge";

type PlusIconProps = {
  viewBox?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
  strokeLinecap?: "butt" | "round" | "square" | "inherit";
  classes?: string;
};

export const PlusIcon = ({
  viewBox = "0 0 24 24",
  fill = "none",
  stroke = "currentColor",
  strokeWidth = "0.75",
  strokeLinecap = "round",
  classes,
}: PlusIconProps) => {
  return (
    <svg
      viewBox={viewBox}
      fill={fill}
      className={twMerge("size-14", classes)}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
    >
      <rect x="4.5" y="4.5" width="15" height="15" rx="2" />
      <path d="M12 8 L12 16" />
      <path d="M8 12 L16 12" />
    </svg>
  );
}
