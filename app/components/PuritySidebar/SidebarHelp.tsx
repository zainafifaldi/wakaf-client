import { QuestionIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Link,
  Text,
} from "@chakra-ui/react";
import IconBox from "components/Icons/IconBox";
import React from "react";

export default function SidebarHelp(props) {
  // Pass the computed styles into the `__css` prop
  const { children, ...rest } = props;
  return (
    <Flex
      borderRadius="15px"
      flexDirection="column"
      bgImage={"data:image/png;base64,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"}
      justifyContent="flex-start"
      alignItems="start"
      boxSize="border-box"
      p="16px"
      h="170px"
      w="100%"
    >
      <IconBox width="35px" h="35px" bg="white" mb="auto">
        <QuestionIcon color="teal.300" h="18px" w="18px" />
      </IconBox>
      <Text fontSize="sm" color="white" fontWeight="bold">
        Need help?
      </Text>
      <Text fontSize="xs" color="white" mb="10px">
        Please check our docs
      </Text>
      <Link
        w="100%"
        href="https://demos.creative-tim.com/docs-purity-ui-dashboard/"
      >
        <Button
          fontSize="10px"
          fontWeight="bold"
          w="100%"
          bg="white"
          // _hover="none"
          _active={{
            bg: "white",
            transform: "none",
            borderColor: "transparent",
          }}
          _focus={{
            boxShadow: "none",
          }}
          color="black"
        >
          DOCUMENTATION
        </Button>
      </Link>
    </Flex>
  );
}
