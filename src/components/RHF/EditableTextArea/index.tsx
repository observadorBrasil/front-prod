import React, { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import {
  FormControl,
  FormControlProps,
  FormLabel,
  FormLabelProps,
  HStack,
  StackProps,
  Textarea,
  TextProps,
  VStack,
} from "@chakra-ui/react";
import theme from "../../../theme";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label: string;
  rhfregister: UseFormRegisterReturn;
  id: string;
  initialValue?: string;
  labelProps?: FormLabelProps;
  onEnable?: (enabled: boolean) => void;
}

const EditableTextArea = (
  props: Props & StackProps & FormControlProps & FormLabelProps
) => {
  const { label, rhfregister, initialValue, labelProps, onEnable, ...rest } =
    props;

  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (onEnable) onEnable(enabled);
  }, [enabled, onEnable]);

  return (
    <VStack w={"100%"} {...rest} align={"flex-start"} justify={"space-between"}>
      <FormControl id={props.id} w={"full"}>
        <HStack
          w={"100%"}
          align={"center"}
          justify={"space-between"}
          pl={1}
          pr={1}
        >
          <FormLabel
            htmlFor={props.id}
            fontWeight={"semibold"}
            fontSize={"l"}
            {...labelProps}
          >
            {label}
          </FormLabel>
          <EditOutlined
            style={{ borderColor: theme.colors.primary, fontSize: 25 }}
            onClick={() => setEnabled(!enabled)}
          />
        </HStack>
        <VStack
          w={"100%"}
          align={"flex-start"}
          justify={"space-between"}
          backgroundColor={"lightGray"}
          borderRadius={10}
          mt={"4"}
        >
          <Textarea
            id={props.id}
            border={"none"}
            color={"black"}
            disabled={!enabled}
            defaultValue={initialValue}
            {...rhfregister}
          />
        </VStack>
      </FormControl>
    </VStack>
  );
};

export default EditableTextArea;
