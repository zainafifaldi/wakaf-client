import React, { ReactNode } from "react";
import { Flex, ComponentDefaultProps } from "@chakra-ui/react";

interface IconBoxProps extends ComponentDefaultProps {
  children?: ReactNode;
}

export default function IconBox({
  children,
  ...rest
}: IconBoxProps) {

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"12px"}
      {...rest}
    >
      {children}
    </Flex>
  );
}
