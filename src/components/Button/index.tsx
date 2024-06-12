import React from "react";
import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

interface Props {
  variant: "primary" | "secondary";
}

const Button = ({ variant, ...props }: Props & ButtonProps) => {
  return (
    <ChakraButton
      backgroundColor={variant}
      alignItems={"center"}
      color={variant === "primary" ? "secondary" : "primary"}
      border={variant === "secondary" ? "1px solid" : "none"}
      borderColor={"primary"}
      h={"100%"}
      py={1}
      px={4}
      {...props}
    >
      {props.children}
    </ChakraButton>
  );
};

export default Button;
