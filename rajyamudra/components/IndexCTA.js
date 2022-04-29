import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import * as React from "react";
import NextLink from "next/link";

export const IndexCTA = () => (
  <Box as="section" bg="bg-surface">
    <Container
      py={{
        base: "16",
        md: "24",
      }}>
      <Stack
        spacing={{
          base: "8",
          md: "10",
        }}>
        <Stack
          spacing={{
            base: "4",
            md: "5",
          }}
          align="center">
          <Heading
            size={useBreakpointValue({
              base: "3xl",
              md: "xl",
            })}
            >
            Are you ready to experience the new age of crowdfunding?
          </Heading>
          <Text color="muted" maxW="2xl" textAlign="center" fontSize="xl">
          Crowdfunding made Transparent, Secure and Robust, so that your goals are never compromised.
          </Text>
        </Stack>
        <Stack
          spacing="3"
          direction={{
            base: "column",
            sm: "row",
          }}
          justify="center">
          <Button
              size={"lg"}
              _hover={{ color: "orange.500" }}
              variant={"link"}>
              <NextLink href="/#getstarted"> Get Started</NextLink>
            </Button>
          <NextLink href="/campaign/new">
            <Button
              display={{ sm: "inline-flex" }}
              fontSize={"md"}
              fontWeight={600}
              color={"white"}
              bg={"orange.400"}
              _hover={{
                bg: "orange.300",
              }}>
              Start a Campaign
            </Button>
          </NextLink>
        </Stack>
      </Stack>
    </Container>
  </Box>
);
