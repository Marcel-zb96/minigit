import React from "react";
import { FormRow } from "./FormRow";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type FromTextAreaProps = {
  label: string;
  fieldError?: FieldError;
  register: UseFormRegisterReturn;
};

export const FormTextArea = ({ label, fieldError, register }: FromTextAreaProps) => {
  return (
    <FormRow fieldError={fieldError} label={label}>
      <textarea id={label} className="h-32 w-full p-2 overflow-scroll bg-white rounded-xl" {...register} />
    </FormRow>
  );
};
