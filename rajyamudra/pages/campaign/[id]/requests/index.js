import React, { useState, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import NextImage from "next/image";
import { getETHPrice, getWEIPriceInUSD } from "../../../../utils/getETHPrice";
import {
  Heading,
  useBreakpointValue,
  useColorModeValue,
  Text,
  Button,
  Flex,
  Container,
  SimpleGrid,
  Box,
  Spacer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  Skeleton,
  Alert,
  AlertIcon,
  AlertDescription,
  Stack,
} from "@chakra-ui/react";
import {
  ArrowBackIcon,
} from "@chakra-ui/icons";
import web3 from "../../../../ethereum-contracts/web3";
import Campaign from "../../../../ethereum-contracts/campaign";
// import factory from "../../../../ethereum-contracts/factory";
import { RequestRow } from "../../../../components/Requestrow";

export async function getServerSideProps({ params }) {
  const campaignId = params.id;
  const campaign = Campaign(campaignId);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();
  const summary = await campaign.methods.getSummary().call();
  const ETHPrice = await getETHPrice();

  return {
    props: {
      campaignId,
      requestCount,
      approversCount,
      balance: summary[1],
      name: summary[5],
      ETHPrice,
    },
  };
}

export default function Requests({
  campaignId,
  requestCount,
  approversCount,
  balance,
  name,
  ETHPrice,
}) {
  const [requestsList, setRequestsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [FundNotAvailable, setFundNotAvailable] = useState(false);
  const campaign = Campaign(campaignId);
  async function getRequests() {
    try {
      const requests = await Promise.all(
        Array(parseInt(requestCount))
          .fill()
          .map((element, index) => {
            return campaign.methods.requests(index).call();
          })
      );

      console.log("requests", requests);
      setRequestsList(requests);
      setIsLoading(false);
      return requests;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (balance == 0) {
      setFundNotAvailable(true);
    }
    getRequests();
  }, []);

  return (
    <div>
      <Head>
        <title>Campaign Withdrawal Requests</title>
        <meta name="description" content="Create a Withdrawal Request" />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <main>
        <Container px={{ base: "4", md: "12" }} maxW={"7xl"} align={"left"}>
          <Flex flexDirection={{ base: "column", md: "row" }} py={4}>
            <Box py="4">
              <Text fontSize={"lg"} color={"orange.400"}>
                <ArrowBackIcon mr={2} />
                <NextLink href={`/campaign/${campaignId}`}>
                  Back to Campaign
                </NextLink>
              </Text>
            </Box>
            <Spacer />
            <Box py="4">
              Campaign Balance :{" "}
              <Text as="span" fontWeight={"bold"} fontSize="lg">
                {balance > 0
                  ? web3.utils.fromWei(balance, "ether")
                  : "0, Fund this campaign 😊"}
              </Text>
              <Text
                as="span"
                display={balance > 0 ? "inline" : "none"}
                pr={2}
                fontWeight={"bold"}
                fontSize="lg">
                {" "}
                ETH
              </Text>
              <Text
                as="span"
                display={balance > 0 ? "inline" : "none"}
                fontWeight={"normal"}
                color={useColorModeValue("gray.500", "gray.200")}>
                (${getWEIPriceInUSD(ETHPrice, balance)})
              </Text>
            </Box>
          </Flex>
          {FundNotAvailable ? (
            <Alert status="error" my={4}>
              <AlertIcon />
              <AlertDescription>
                The Current Balance of the Campaign is 0, Please Contribute to
                approve and finalize Requests.
              </AlertDescription>
            </Alert>
          ) : null}
        </Container>
        {requestsList.length > 0 ? (
          <Container px={{ base: "4", md: "12" }} maxW={"7xl"} align={"left"}>
            <Flex flexDirection={{ base: "column", lg: "row" }} py={4}>
              <Box py="2" pr="2">
                <Heading
                  textAlign={useBreakpointValue({ base: "left" })}
                  fontFamily={"heading"}
                  color={useColorModeValue("gray.800", "white")}
                  as="h3"
                  isTruncated
                  maxW={"3xl"}>
                  Withdrawal Requests for {name} Campaign
                </Heading>
              </Box>
              <Spacer />
              <Box py="2">
                <NextLink href={`/campaign/${campaignId}/requests/new`}>
                  <Button
                    display={{ sm: "inline-flex" }}
                    justify={"flex-end"}
                    fontSize={"md"}
                    fontWeight={600}
                    color={"white"}
                    bg={"orange.400"}
                    href={"#"}
                    _hover={{
                      bg: "orange.300",
                    }}>
                    Create Withdrawal Request
                  </Button>
                </NextLink>
              </Box>
            </Flex>{" "}
            <Box overflowX="auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th w="30%">Description</Th>
                    <Th isNumeric>Amount</Th>
                    <Th maxW="12%" isTruncated>
                      Recipient Wallet Address
                    </Th>
                    <Th>Approval Count </Th>
                    <Th>Approve </Th>
                    <Th>Finalize </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {requestsList.map((request, index) => {
                    return (
                      <RequestRow
                        key={index}
                        id={index}
                        request={request}
                        approversCount={approversCount}
                        campaignId={campaignId}
                        disabled={FundNotAvailable}
                        ETHPrice={ETHPrice}
                      />
                    );
                  })}
                </Tbody>
                <TableCaption textAlign="left" ml="-2">
                  Found {requestCount} Requests
                </TableCaption>
              </Table>
            </Box>
          </Container>
        ) : (
          <div>
            <Container
              px={{ base: "4", md: "12" }}
              maxW={"7xl"}
              align={"left"}
              display={isLoading ? "block" : "none"}>
              <SimpleGrid rows={{ base: 3 }} spacing={2}>
                <Skeleton height="2rem" />
                <Skeleton height="5rem" />
                <Skeleton height="5rem" />
                <Skeleton height="5rem" />
              </SimpleGrid>
            </Container>
            <Container
              maxW={"lg"}
              align={"center"}
              display={
                requestsList.length === 0 && !isLoading ? "block" : "none"
              }>
              <SimpleGrid row spacing={2} align="center">
                <Stack align="center">
                  <NextImage
                    src="/static/no-requests.png"
                    alt="no-request"
                    width="150"
                    height="150"
                  />
                </Stack>
                <Heading
                  textAlign={"center"}
                  color={useColorModeValue("gray.800", "white")}
                  as="h4"
                  size="md">
                  No Requests yet for {name} Campaign
                </Heading>
                <Text
                  textAlign={useBreakpointValue({ base: "center" })}
                  color={useColorModeValue("gray.600", "gray.300")}
                  fontSize="sm">
                  Create a Withdrawal Request to Withdraw funds from the
                  Campaign😄
                </Text>

                <Button
                  fontSize={"md"}
                  fontWeight={600}
                  color={"white"}
                  bg={"orange.400"}
                  _hover={{
                    bg: "orange.300",
                  }}>
                  <NextLink href={`/campaign/${campaignId}/requests/new`}>
                    Create Withdrawal Request
                  </NextLink>
                </Button>

                <Button
                  fontSize={"md"}
                  fontWeight={600}
                  color={"white"}
                  bg={"gray.400"}
                  _hover={{
                    bg: "gray.300",
                  }}>
                  <NextLink href={`/campaign/${campaignId}/`}>
                    Go to Campaign
                  </NextLink>
                </Button>
              </SimpleGrid>
            </Container>
          </div>
        )}
      </main>
    </div>
  );
}
