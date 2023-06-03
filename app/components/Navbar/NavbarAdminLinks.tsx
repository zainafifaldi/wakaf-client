// import { NavLink } from "react-router-dom";
// Chakra Icons
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Button,
  ComponentDefaultProps,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom Icons
import { ProfileIcon, SettingsIcon } from "components/Icons/Icons";
import { ItemContent } from "components/Notification/ItemContent";
import SidebarResponsive from "components/Sidebar/Purity/SidebarResponsive";
// Custom Components
// import { ItemContent } from "components/Menu/ItemContent";
// import SidebarResponsive from "components/Sidebar/SidebarResponsive";
import PropTypes from "prop-types";
import React, { ReactNode } from "react";
// import routes from "routes.js";

interface HeaderLinks extends ComponentDefaultProps {
  children?: ReactNode;
  variant: string;
  fixed: boolean;
  secondary: boolean;
  logoText: string;
  routes: object;
}

export default function HeaderLinks({
  children,
  variant,
  fixed,
  secondary,
  logoText,
  routes,
  ...rest
}: ComponentDefaultProps) {
  // Chakra Color Mode
  let mainTeal = useColorModeValue("teal.300", "teal.300");
  let inputBg = useColorModeValue("white", "gray.800");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  let searchIcon = useColorModeValue("gray.700", "gray.200");

  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
  }
  const settingsRef = React.useRef();
  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      <InputGroup
        cursor="pointer"
        bg={inputBg}
        borderRadius="15px"
        w={{
          sm: "128px",
          md: "200px",
        }}
        me={{ sm: "auto", md: "20px" }}
        _focus={{
          borderColor: { mainTeal },
        }}
        _active={{
          borderColor: { mainTeal },
        }}
      >
        <InputLeftElement
          children={
            <IconButton
              aria-label=""
              bg="inherit"
              borderRadius="inherit"
              // _hover="none"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
              icon={<SearchIcon color={searchIcon} w="15px" h="15px" />}
            ></IconButton>
          }
        />
        <Input
          fontSize="xs"
          py="11px"
          color={mainText}
          placeholder="Type here..."
          borderRadius="inherit"
        />
      </InputGroup>
      {/* <NavLink to="/auth/signin">
        <Button
          ms="0px"
          px="0px"
          me={{ sm: "2px", md: "16px" }}
          color={navbarIcon}
          variant="transparent-with-icon"
          // rightIcon={
          //   document.documentElement.dir ? (
          //     ""
          //   ) : (
          //     <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
          //   )
          // }
          // leftIcon={
          //   document.documentElement.dir ? (
          //     <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
          //   ) : (
          //     ""
          //   )
          // }
        >
          <Text display={{ sm: "none", md: "flex" }}>Sign In</Text>
        </Button>
      </NavLink> */}
      <SidebarResponsive
        logoText={logoText}
        secondary={secondary}
        routes={routes}
        {...rest}
      />
      <Menu>
        {/* Notifikasi */}
        {/* <MenuButton>
          <BellIcon color={navbarIcon} w="18px" h="18px" />
        </MenuButton>
        <MenuList p="16px 8px">
          <Flex flexDirection="column">
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="13 minutes ago"
                info="from Alicia"
                boldInfo="New Message"
                name="Alicia"
                src={"avatar1.png"}
              />
            </MenuItem>
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="2 days ago"
                info="by Josh Henry"
                boldInfo="New Album"
                name="Josh Henry"
                src={"avatar2.png"}
              />
            </MenuItem>
            <MenuItem borderRadius="8px">
              <ItemContent
                time="3 days ago"
                info="Payment succesfully completed!"
                name="Kara"
                src={"avatar3.png"}
              />
            </MenuItem>
          </Flex>
        </MenuList> */}
      </Menu>
    </Flex>
  );
}
