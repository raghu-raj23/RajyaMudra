import {
  Box,
  Flex,
  Button,
  Stack,
  useColorModeValue,
  Container,
  Heading,
  Menu,
  Icon,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useWallet } from "use-wallet";
import NextLink from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaEthereum } from "react-icons/fa";

export default function NavBar() {
  const wallet = useWallet();

  return (
    <Box>
      <Flex
        color={useColorModeValue("gray.600", "white")}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        pos="fixed"
        top="0"
        w={"full"}
        minH={"60px"}
        boxShadow={"sm"}
        zIndex="500"
        justify={"center"}
        css={{
          backdropFilter: "saturate(180%) blur(25px)",
          backgroundColor: useColorModeValue(
            "rgba(255, 255, 255, 0.8)",
            "rgba(26, 32, 44, 0.8)"
          ),
        }}>
        <Container as={Flex} maxW={"7xl"} align={"center"}>
          <Flex flex={{ base: 1 }} justify="start" ml={{ base: -2, md: 0 }}>
            <Heading
              textAlign="left"
              fontFamily={"heading"}
              color={useColorModeValue("orange.800", "white")}
              as="h2"
              size="lg">
              <Box
                as={"span"}
                color={useColorModeValue("orange.400", "orange.300")}
                position={"relative"}
                zIndex={10}>
                <Icon
                  as={FaEthereum}
                  h={7}
                  w={7}
                  alignSelf={"center"}
                  color={"yellow.500"}
                />
                <NextLink href="/">RajyaMudra</NextLink>
              </Box>
            </Heading>
          </Flex>
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
            display={{ base: "none", md: "flex" }}>
            <Button
              fontSize={"md"}
              fontWeight={600}
              _hover={{ color: "orange.500" }}
              variant={"link"}
              display={{ base: "none", md: "inline-flex" }}>
              <NextLink href="/#getstarted"> Get Started</NextLink>
            </Button>

            {wallet.status === "connected" ? (
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {wallet.account.substr(2, 8) + "..."}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => wallet.reset()}>
                    {" "}
                    Disconnect Wallet{" "}
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <div>
                <Button
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"md"}
                  fontWeight={600}
                  color={"white"}
                  bg={"orange.400"}
                  href={"#"}
                  _hover={{
                    bg: "orange.300",
                  }}
                  onClick={() => wallet.connect()}>
                  Connect Wallet{" "}
                </Button>
              </div>
            )}

            <DarkModeSwitcher />
          </Stack>

          <Flex display={{ base: "flex", md: "none" }}>
            <DarkModeSwitcher />
          </Flex>
        </Container>
      </Flex>
    </Box>
  );
}
