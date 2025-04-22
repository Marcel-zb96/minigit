import React from "react";
import { twMerge } from "tailwind-merge";

type RepositoryIconProps = {
  fill?: string;
  viewBox?: string;
  strokeWidth?: string;
  stroke?: string;
  classes?: string;
};

export const RepositoryIcon = ({
  fill = "none",
  viewBox = "0 0 24 24",
  strokeWidth = "0.5",
  stroke = "currentColor",
  classes,
}: RepositoryIconProps) => {
  return (
    <svg
      fill={fill}
      viewBox={viewBox}
      strokeWidth={strokeWidth}
      stroke={stroke}
      className={twMerge("size-14", classes)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 6.375c0 2.28-3.69 4.13-8.25 4.13S3.75 8.65 3.75 6.38c0-2.28 3.69-4.13 8.25-4.13s8.25 1.85 8.25 4.13v11.25c0 2.28-3.69 4.13-8.25 4.13s-8.25-1.85-8.25-4.13V6.38m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75c0 2.28-3.69 4.13-8.25 4.13s-8.25-1.85-8.25-4.13v-3.75c0 2.28 3.69 4.13 8.25 4.13s8.25-1.85 8.25-4.13"
      />
    </svg>
  );
};
