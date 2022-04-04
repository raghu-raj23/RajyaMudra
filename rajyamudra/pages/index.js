import Head from "next/head";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import styles from "../styles/Home.module.css";
import { getETHPrice, getWEIPriceInUSD } from "../utils/getETHPrice";
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
  Divider,
  Skeleton,
  Img,
  Icon,
  chakra,
  Tooltip,
  Link,
  SkeletonCircle,
  HStack,
  Stack,
  Progress,
} from "@chakra-ui/react";

// import factory from "../smart-contract/factory";
// import web3 from "../smart-contract/web3";
// import Campaign from "../smart-contract/campaign";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FaEthereum } from "react-icons/fa";
import { FcIdea, FcShare, FcMoneyTransfer } from "react-icons/fc";

// export async function getServerSideProps(context) {
//   const campaigns = await factory.methods.getDeployedCampaigns().call();

//   console.log(campaigns);

//   return {
//     props: { campaigns },
//   };
// }

const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={useColorModeValue("gray.100", "gray.700")}
        mb={1}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={useColorModeValue("gray.500", "gray.200")}>{text}</Text>
    </Stack>
  );
};

function CampaignCard({
  name,
  description,
  creatorId,
  imageURL,
  id,
  balance,
  target,
  ethPrice,
}) {
  return (
    <NextLink href={`/campaign/${id}`}>
      <Box
        bg={useColorModeValue("white", "gray.700")}
        maxW={{ md: "sm" }}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        transition={"transform 0.3s ease"}
        _hover={{
          transform: "translateY(-8px)",
        }}>
        <Box height="18em">
          <Img
            src={imageURL}
            alt={`Image for ${name}`}
            roundedTop="lg"
            objectFit="cover"
            w="full"
            h="full"
            display="block"
          />
        </Box>
        <Box p="6">
          <Flex
            mt="1"
            justifyContent="space-between"
            alignContent="center"
            py={2}>
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated>
              {name}
            </Box>

            <Tooltip
              label="Contribute"
              bg={useColorModeValue("white", "gray.600")}
              placement={"top"}
              color={useColorModeValue("gray.800", "white")}
              fontSize={"1.2em"}>
              <chakra.a display={"flex"}>
                <Icon
                  as={FaEthereum}
                  h={7}
                  w={7}
                  alignSelf={"center"}
                  color={"purple.700"}
                />{" "}
              </chakra.a>
            </Tooltip>
          </Flex>
          <Flex alignContent="center" py={2}>
            {" "}
            <Text color={"gray.500"} pr={2}>
              by
            </Text>{" "}
            <Heading size="base" isTruncated>
              {creatorId}
            </Heading>
          </Flex>
          <Flex direction="row" py={2}>
            <Box w="full">
              <Box
                fontSize={"2xl"}
                isTruncated
                maxW={{ base: "	15rem", sm: "sm" }}
                pt="2">
                <Text
                  as="span"
                  display={balance > 0 ? "inline" : "none"}
                  pr={2}
                  fontWeight={"bold"}>
                  {" "}
                  Raised:{" "}
                </Text>
                <Text as="span" fontWeight={"bold"}>
                  {balance > 0
                    ? web3.utils.fromWei(balance, "ether")
                    : "0, Fund this campaign 😊"}
                </Text>
                <Text
                  as="span"
                  display={balance > 0 ? "inline" : "none"}
                  pr={2}
                  fontWeight={"bold"}>
                  {" "}
                  ETH
                </Text>
                <Text
                  as="span"
                  fontSize="lg"
                  display={balance > 0 ? "inline" : "none"}
                  fontWeight={"normal"}
                  color={useColorModeValue("gray.500", "gray.200")}>
                  (${getWEIPriceInUSD(ethPrice, balance)})
                </Text>
              </Box>

              <Text fontSize={"md"} fontWeight="normal">
                Campaign target: {web3.utils.fromWei(target, "ether")} ETH ($
                {getWEIPriceInUSD(ethPrice, target)})
              </Text>
              <Progress
                colorScheme="orange"
                size="sm"
                rounded="lg"
                value={web3.utils.fromWei(balance, "ether")}
                max={web3.utils.fromWei(target, "ether")}
                mt="2"
              />
            </Box>{" "}
          </Flex>
        </Box>
      </Box>
    </NextLink>
  );
}

export default function Home({ campaigns }) {
  const [campaignList, setCampaignList] = useState([]);
  const [ethPrice, updateEthPrice] = useState(null);

  async function getSummary() {
    try {
      const summary = await Promise.all(
        campaigns.map((campaign, i) =>
          Campaign(campaigns[i]).methods.getSummary().call()
        )
      );
      const ETHPrice = await getETHPrice();
      updateEthPrice(ETHPrice);
      console.log("summary ", summary);
      setCampaignList(summary);

      return summary;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getSummary();
  }, []);

  return (
    <div>
      <Head>
        <title>RajyaMudra</title>
        <meta
          name="description"
          content="Decentralized Crowdfunding Platform"
        />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <main className={styles.main}>
        <Container py={{ base: "4", md: "12" }} maxW={"7xl"} align={"left"}>
          {" "}
          <Heading
            textAlign={useBreakpointValue({ base: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            as="h1"
            py={4}>
            Crowdfunding made simpler, transparent and secure using
            <br /> Blockchain & Ethereum Smart Contracts{" "}
          </Heading>
          <Divider marginTop="4" />
          <Container py={{ base: "4", md: "12" }} maxW={"7xl"} id="getstarted">
            <HStack spacing={2}>
              <SkeletonCircle size="4" />
              <Heading as="h2" size="lg">
                How RajyaMudra Works
              </Heading>
            </HStack>

            <Divider marginTop="4" />
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} py={8}>
              <Feature
                icon={<Icon as={FcIdea} w={10} h={10} />}
                title={"Start your Campaign"}
                text={
                  "Provide the details for your campaign in the required fields and you are all-set for the crowd funding process. 😁"
                }
              />
              <Feature
                icon={<Icon as={FcShare} w={10} h={10} />}
                title={"Publish and Promote your Campaign"}
                text={
                  "Publish the campaign on the platform and share your motivation with the world 🙌 and make yourself heard. 😉"
                }
              />
              <Feature
                icon={<Icon as={FcMoneyTransfer} w={10} h={10} />}
                title={"Request and Withdraw Funds"}
                text={
                  "Once you have raised funds, you can make a withdrawal request. You can withdraw funds from the capaign when 50% of the contributors approve your request. 💰"
                }
              />
            </SimpleGrid>

            <Divider marginTop="4" />
          </Container>
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
        </Container>
        <Container py={{ base: "4", md: "12" }} maxW={"7xl"}>
          <HStack spacing={2}>
            <SkeletonCircle size="4" />
            <Heading as="h2" size="lg">
              Available Campaigns
            </Heading>
          </HStack>

          <Divider marginTop="4" />

          {campaignList.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} py={8}>
              {campaignList.map((el, i) => {
                return (
                  <div key={i}>
                    <CampaignCard
                      name={el[5]}
                      description={el[6]}
                      creatorId={el[4]}
                      imageURL={el[7]}
                      id={campaigns[i]}
                      target={el[8]}
                      balance={el[1]}
                      ethPrice={ethPrice}
                    />
                  </div>
                );
              })}
            </SimpleGrid>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} py={8}>
              <Skeleton height="25rem" />
              <Skeleton height="25rem" />
              <Skeleton height="25rem" />
            </SimpleGrid>
          )}
        </Container>
        <Divider marginTop="4" />

        <Heading as="h4" size="lg" mt="8">
          For any queries raise an issue on{" "}
          <Link
            color="red.500"
            href="https://github.com/raghu-raj23/RajyaMudra/issues"
            isExternal>
            the Github Repo <ExternalLinkIcon mx="2px" />
          </Link>{" "}
        </Heading>
        <Heading as="h4" size="lg" mt="8">
          Fork the project on{" "}
          <Link
            color="red.500"
            href="https://github.com/raghu-raj23/RajyaMudra/"
            isExternal>
            the Github Repo <ExternalLinkIcon mx="2px" />
          </Link>{" "}
        </Heading>
      </main>
    </div>
  );
}
