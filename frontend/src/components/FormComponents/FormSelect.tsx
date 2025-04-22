import React from "react";
import { FormRow } from "./FormRow";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type FormSelectProps = {
  fieldError?: FieldError;
  label: string;
  register: UseFormRegisterReturn;
  options: string[];
};

export const FormSelect = ({ fieldError, label, register, options }: FormSelectProps) => {
  return (
    <FormRow fieldError={fieldError} label={label}>
      <select id={label} className="h-14 w-full pl-2 bg-white text-black rounded-xl" {...register}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </FormRow>
  );
};
