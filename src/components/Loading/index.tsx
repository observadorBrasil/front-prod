import React from "react";
import { Spinner, SpinnerProps } from "@chakra-ui/react";

export const Loading = (props: SpinnerProps) => {
  return <Spinner {...props} />;
};
