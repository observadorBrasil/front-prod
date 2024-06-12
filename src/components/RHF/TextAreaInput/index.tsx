import React, { ReactNode } from "react";
import {
  Flex,
  FormControl,
  FormControlProps,
  FormLabel,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  id: string;
  placeholder?: string;
  label?: string;
  containerProps?: FormControlProps;
  inputProps?: TextareaProps;
  children?: ReactNode | ReactNode[];
  rhfregister: UseFormRegisterReturn;
}

function TextAreaInput(props: Props) {
  const {
    label,
    id,
    placeholder,
    children,
    rhfregister,
    inputProps,
    containerProps,
  } = props;

  return (
    <FormControl id={id} {...containerProps}>
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <Textarea
        borderTop={"none"}
        borderRight={"none"}
        borderLeft={"none"}
        borderRadius={0}
        borderBottom={"1px"}
        p={0}
        color={"primary"}
        placeholder={placeholder}
        {...inputProps}
        {...rhfregister}
      />
      {children && (
        <Flex
          direction={"row"}
          align={"center"}
          justify={"flex-end"}
          pos={"absolute"}
          top={"20%"}
          right={"10%"}
        >
          {children}
        </Flex>
      )}
    </FormControl>
  );
}

export default TextAreaInput;
