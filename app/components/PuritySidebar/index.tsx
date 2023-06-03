import { useRef } from 'react';
import {
  Box, ComponentDefaultProps, useColorModeValue
} from "@chakra-ui/react";

import SidebarContent from "components/PuritySidebar/SidebarContent";

interface SidebarProps extends ComponentDefaultProps {
  routes: object;
  logoText: string;
  sidebarVariant?: string;
}

export default function Sidebar({
  routes,
  logoText,
  sidebarVariant = "transparent",
}: SidebarProps) {
  // to check for active links and opened collapses
  const mainPanel = useRef();
  let variantChange = "0.2s linear";

  //  BRAND
  //  Chakra Color Mode
  let sidebarBg = "none";
  let sidebarRadius = "0px";
  let sidebarMargins = "0px";

  if (sidebarVariant === "opaque") {
    sidebarBg = useColorModeValue("white", "gray.700");
    sidebarRadius = "16px";
    sidebarMargins = "16px 0px 16px 16px";
  }

  return (
    <Box ref={mainPanel}>
      <Box display={{ sm: "none", xl: "block" }} position="fixed">
        <Box
          bg={sidebarBg}
          transition={variantChange}
          w="260px"
          maxW="260px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          h="calc(100vh - 32px)"
          ps="20px"
          pe="20px"
          m={sidebarMargins}
          borderRadius={sidebarRadius}
        >
          <SidebarContent
            routes={routes}
            logoText={logoText}
            display="none"
          />
        </Box>
      </Box>
    </Box>
  );
}
