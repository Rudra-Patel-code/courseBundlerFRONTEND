import { Box, Heading, HStack, Stack, VStack } from "@chakra-ui/react";
import React from "react";

import { FaInstagram, FaGithub } from "react-icons/fa";
const Footer = () => {
  return (
    <Box padding={"4"} bg="blackAlpha.900" minH={"10vh"}>
      <Stack direction={["column", "row"]}>
        <VStack alignItems={["center", "flex-start"]} width="full">
          <Heading children="All Rights Reserved" color={"white"} />
          <Heading
            fontFamily={"body"}
            size="sm"
            children="@rudrapatel"
            color={"yellow.400"}
          />
        </VStack>

        <HStack
          spacing={["2", "10"]}
          justifyContent="center"
          color={"white"}
          fontSize="50"
        >
          <a href="https://instagram.com/patel.rudra.00" target={"blank"}>
            <FaInstagram />
          </a>
          <a href="https://github.com/Rudra-Patel-code" target={"blank"}>
            <FaGithub />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
