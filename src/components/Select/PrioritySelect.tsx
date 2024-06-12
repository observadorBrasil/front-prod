import React from "react";
import {
  FormControl,
  FormControlProps,
  FormLabel,
  Select,
  SelectProps,
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";
import PriorityLevels from "../../utils/priority-levels";

interface Props {
  onChange?: (v: string) => void;
  label?: string;
  rhfregister: UseFormRegisterReturn;
  containerProps?: FormControlProps;
}

function PrioritySelect(props: SelectProps & Props) {
  return (
    <FormControl
      display={"flex"}
      flexDirection={"row"}
      alignItems={"baseline"}
      justifyContent={"flex-start"}
      id={props.id}
      {...props.containerProps}
    >
      {props.label && <FormLabel>{props.label}</FormLabel>}
      <Select w={"auto"} {...props} {...props.rhfregister}>
        {PriorityLevels.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

export default PrioritySelect;
