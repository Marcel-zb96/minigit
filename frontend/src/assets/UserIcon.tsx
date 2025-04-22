import React from "react";
import { twMerge } from "tailwind-merge";

type UserIconProps = {
  viewBox?: string;
  stroke?: string;
  strokeWidth?: string;
  strokeLinecap?: "butt" | "round" | "square" | "inherit";
  fill?: string;
  classes?: string;
};

export const UserIcon = ({
  viewBox = "0 0 26 24",
  stroke = "currentColor",
  strokeWidth = "0.75",
  strokeLinecap = "round",
  fill = "none",
  classes,
}: UserIconProps) => {
  return (
    <svg
      className={twMerge("size-10 md:size-14", classes)}
      viewBox={viewBox}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      fill={fill}
    >
      <path
        stroke={stroke}
        fill={fill}
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
};
