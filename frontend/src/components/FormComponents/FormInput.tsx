import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { FormRow } from "./FormRow";

type FormInputProps = {
  type: string;
  label: string;
  register: UseFormRegisterReturn;
  fieldError?: FieldError;
};

export const FormInput = ({ type, label, register, fieldError }: FormInputProps) => {
  return (
    <FormRow label={label} fieldError={fieldError}>
      <input type={type} id={label} className="h-14 w-full pl-2 bg-white text-black rounded-xl" {...register} />
    </FormRow>
  );
};
