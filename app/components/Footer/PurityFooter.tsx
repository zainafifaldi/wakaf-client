/*eslint-disable*/
import React from "react";
import {
  chakra,
  Flex,
  List,
  ListItem,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
// import NavLink from "components/NavLink";
import { FaInstagram } from 'react-icons/fa';
import { ReactNode } from 'react';

interface SocialButtonProps {
  children?: ReactNode;
  label: string;
  href: string;
}

const SocialButton = ({
  children,
  label,
  href,
}: SocialButtonProps) => {
  return (
    <chakra.button
      cursor="pointer"
      as="a"
      href={href}
      target="_blank"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  // const linkTeal = useColorModeValue("teal.400", "red.200");
  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent="space-between"
      px="30px"
      pb="20px"
    >
      <Text
        color="gray.400"
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}
      >
        &copy; {new Date().getFullYear() + " "}
        <Text as="span">
          Pondok Saif Al-Ulum. All rights reserved
        </Text>
      </Text>
      <List display="flex">
        {/* <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <NavLink color="gray.400" href="https://www.creative-tim.com">
            Creative Tim
          </NavLink>
        </ListItem> */}
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <SocialButton label="Instagram" href="https://www.instagram.com/pondok.saifalulum">
            <FaInstagram />
          </SocialButton>
        </ListItem>
      </List>
    </Flex>
  );
}
