import React from "react";
import {
  CheckboxGroupProps,
  Checkbox as ChakraCheckbox,
  CheckboxGroup as ChakraCheckboxGroup,
} from "@chakra-ui/react";
import { Control, Controller } from "react-hook-form";

interface Checkbox {
  name: string;
  label: string;
}

interface Props {
  rhfControl: Control<any, any>;
  checkboxes: Checkbox[];
}

function CheckboxGroup(props: CheckboxGroupProps & Props) {
  const { rhfControl, checkboxes, ...checkboxProps } = props;

  return (
    <ChakraCheckboxGroup {...checkboxProps}>
      {checkboxes.map((c) => (
        <Controller
          key={c.name}
          control={rhfControl}
          name={c.name}
          defaultValue={false}
          render={({ field }) => (
            <ChakraCheckbox
              isChecked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            >
              {c.label}
            </ChakraCheckbox>
          )}
        />
      ))}
    </ChakraCheckboxGroup>
  );
}

export default CheckboxGroup;
