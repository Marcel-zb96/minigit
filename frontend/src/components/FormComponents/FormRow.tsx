import React, { ReactNode } from "react";
import { FormError } from "../error/FormError";
import { FieldError } from "react-hook-form";

type FormRowProps = {
  children: ReactNode;
  fieldError?: FieldError;
  label: string;
};

export const FormRow = ({ children, fieldError, label }: FormRowProps) => {
  return (
    <div className="flex flex-col gap-2 ">
      <label htmlFor={label} className="pl-1 text-white">
        {label}
      </label>
      {children}
      <FormError fieldError={fieldError} />
    </div>
  );
};
