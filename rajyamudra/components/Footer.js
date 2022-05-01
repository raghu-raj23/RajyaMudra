import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Heading,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin,FaEthereum, FaHome } from "react-icons/fa";
import NextLink from "next/link";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.200", "whiteAlpha.200")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("orange.300", "orange.300"),
      }}
      target="_blank"
      rel="noopener noreferrer">
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}>
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}>
          <Text>Made with ❤️ by Raghuraj, Karan</Text>

          <Stack direction={"row"} spacing={6}>
          <SocialButton
              label={"Home"}
              href={"/"}>
              <FaHome />
            </SocialButton>
            <SocialButton
              label={"Github"}
              href={"https://github.com/raghu-raj23"}>
              <FaGithub />
            </SocialButton>
            <SocialButton
              label={"LinkedIn"}
              href={"https://www.linkedin.com/in/raghu-raj-muni/"}>
              <FaLinkedin />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
