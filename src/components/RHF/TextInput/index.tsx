import React, { ReactNode, useState } from "react";
import {
  Box,
  Flex,
  FlexProps,
  FormControl,
  FormLabel,
  Input,
  InputProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

const defaultInputProps = {
  fontSize: "md",
  borderColor: "black",
  color: "black",
};

const defaultContainerProps = {
  color: "black",
  width: { base: "100%", md: "40%" },
  paddingTop: { base: 2, md: 6 },
  paddingBottom: { base: 2, md: 6 },
};

interface Props {
  id: string;
  placeholder?: string;
  icon?: ReactNode;
  label?: string;
  containerProps?: FlexProps;
  inputProps?: InputProps;
  children?: ReactNode | ReactNode[];
  rhfregister: UseFormRegisterReturn;
  required?: boolean;
  suggestions?: {
    options: () => string[] | number[];
    onOptionClick: (v: string | number) => void;
  };
}

function TextInput(props: Props & InputProps) {
  const {
    icon,
    label,
    id,
    type,
    containerProps,
    placeholder,
    children,
    variant = "flushed",
    inputProps,
    rhfregister,
    required,
    suggestions,
  } = props;

  const [inputIsFocused, setInputIsFocused] = useState<boolean>(false);

  const options = suggestions ? suggestions.options() : null;

  return (
    <Flex
      direction={"row"}
      align={"flex-end"}
      justify={"flex-start"}
      pt={6}
      pb={6}
      {...{ ...defaultContainerProps, ...containerProps }}
    >
      <>
        {icon && <Box marginRight={4}>{icon}</Box>}
        <FormControl
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          id={id}
        >
          {label && (
            <FormLabel
              mb={0}
              htmlFor={id}
              display={"flex"}
              alignContent={"center"}
              justifyContent={"center"}
            >
              {label}
              {required && (
                <Text ml={1} color={"red"}>
                  *
                </Text>
              )}
            </FormLabel>
          )}
          <Input
            variant={variant}
            placeholder={placeholder}
            type={type}
            onFocus={() => (!inputIsFocused ? setInputIsFocused(true) : null)}
            onBlurCapture={(e) => {
              if (inputIsFocused && e.target.id !== id) {
                setInputIsFocused(false);
              }
            }}
            {...{ ...defaultInputProps, ...inputProps }}
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
          {suggestions && options && inputIsFocused && (
            <VStack
              pos={"absolute"}
              top={"100%"}
              left={0}
              w={"full"}
              border={"1px solid"}
              borderColor={"primary"}
              borderBottomRadius={10}
              borderTopRadius={0}
              justify={"space-between"}
              align={"flex-start"}
              backgroundColor={"secondary"}
              p={2}
              maxH={300}
              zIndex={10}
              overflowY={"scroll"}
              onMouseLeave={() => {
                if (inputIsFocused) setInputIsFocused(false);
              }}
            >
              {suggestions &&
                options.map((s, idx) => (
                  <React.Fragment key={s}>
                    <Text
                      w={"100%"}
                      pt={2}
                      pb={2}
                      borderBottom={
                        idx !== options.length - 1 && options.length > 1
                          ? "1px solid"
                          : "0px solid"
                      }
                      borderColor={"primary"}
                      onClick={() => suggestions.onOptionClick(s)}
                    >
                      {s}
                    </Text>
                  </React.Fragment>
                ))}
            </VStack>
          )}
        </FormControl>
      </>
    </Flex>
  );
}

export default TextInput;
