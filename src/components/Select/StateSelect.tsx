import React from "react";
import { FormControl, FormLabel, Select, SelectProps } from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";
import { states } from "../../utils/states";

interface Props {
  rhfregister: UseFormRegisterReturn;
  value?: string;
  onChange?: (v: string) => void;
  label?: string;
}

function StateSelect({ rhfregister, ...props }: SelectProps & Props) {
  return (
    <FormControl id={props.id} ml={"12px"}>
      {props.label && <FormLabel>{props.label}</FormLabel>}
      <Select {...rhfregister} {...props}>
        {states.map((s) => (
          <option key={s.id} value={s.code}>
            {s.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

export default StateSelect;
