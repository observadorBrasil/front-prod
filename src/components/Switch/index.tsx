import {
  FormControl,
  FormControlProps,
  FormLabel,
  Switch as ChakraSwitch,
} from "@chakra-ui/react";

interface Props {
  label: string;
  id: string;
}

const Switch = (props: Props & FormControlProps) => {
  return (
    <FormControl
      {...props}
      display="flex"
      alignItems="center"
      w={"auto"}
      pl={8}
      pr={8}
    >
      <FormLabel htmlFor={props.id} mb="0">
        {props.label}
      </FormLabel>
      <ChakraSwitch id={props.id} />
    </FormControl>
  );
};

export default Switch;
