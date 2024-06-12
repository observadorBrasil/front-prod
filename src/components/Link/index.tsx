import React, { ReactNode } from "react";
import NextLink from "next/link";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

interface Props extends ChakraLinkProps {
  children?: ReactNode[] | ReactNode;
  target?: React.HTMLAttributeAnchorTarget;
}

const Link = (
  { href, children, ...props }: Props,
  ref: React.LegacyRef<HTMLAnchorElement>
) => (
  <NextLink
    href={href!.toString()}
    passHref
    legacyBehavior
    target={props.target}
  >
    <ChakraLink color={"primary"} ref={ref} {...props}>
      {children}
    </ChakraLink>
  </NextLink>
);

export default React.forwardRef<HTMLAnchorElement, Props>(Link);
