import Head from "next/head";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import styles from "../styles/Home.module.css";
import { getETHPrice, getWEIPriceInUSD } from "../utils/getETHPrice";
import {
  chakra,
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
  SkeletonCircle,
  SkeletonText,
  Img,
  Icon,
  Link,
  Tooltip,
  Stack,
  HStack,
  Progress,
} from "@chakra-ui/react";
import { BiNetworkChart } from "react-icons/bi";
import factory from "../ethereum-contracts/factory";
import web3 from "../ethereum-contracts/web3";
import Campaign from "../ethereum-contracts/campaign";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FaEthereum } from "react-icons/fa";
import { FcIdea, FcMoneyTransfer, FcApproval } from "react-icons/fc";
import { StarterCard, CampaignCard } from "../components/CardUI";
import { IndexCTA } from "../components/IndexCTA";

export async function getServerSideProps(context) {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  console.log(campaigns);

  return {
    props: { campaigns },
  };
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
          {/* <Heading
            textAlign={useBreakpointValue({ base: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            as="h1"
            py={4}>
            Transparency, accountability and security for your crowdfunding
            experience{" "}
          </Heading>
          <Text fontSize='xl' color={useColorModeValue("orange.600", "gray.200")}>
            A decentralized platform that enables you to raise funds for your
            project, and track the progress of your project.
          </Text>
          <Divider marginTop="4" /> */}

          <IndexCTA />

          {/* <Container py={{ base: "4", md: "12" }} maxW={"7xl"} id="gettoknow">
            <HStack spacing={2}>
              <SkeletonCircle
                size="4"
                startColor="purple.500"
                endColor="orange.500"
              />
              <Heading as="h2" size="lg">
                So what exactly is RajyaMudra?
              </Heading>
            </HStack>

            <Divider marginTop="4" />
            <Flex
              align="center"
              justify={{
                base: "center",
                md: "space-around",
                xl: "space-between",
              }}
              direction={{ base: "column-reverse", md: "row" }}
              wrap="no-wrap"
              minH="70vh"
              px={8}
              mb={16}>
              <Stack
                spacing={4}
                w={{ base: "80%", md: "40%" }}
                align={["center", "center", "flex-start", "flex-start"]}>
                <Text
                  fontSize='xl'
                  color={useColorModeValue("orange.500", "gray.200")}>
                  RajyaMudra is an initiative to build a platform accessible to
                  all and where start-ups, organizations and people who require
                  help can raise funds without fighting the hassales of present
                  day crowdfunding.
                  <br />
                  <em>RajyaMudra</em> believes in decentralized power
                  distribution where potential extrinsic barriers for the
                  initiatives can be reduced to minimum.
                  <br /> Our crowdfunding process is governed by smart contracts
                  which will help improve tracability and reduces chances of
                  fraud.{" "}
                </Text>
              </Stack>
              <Box
                w={{ base: "80%", sm: "60%", md: "50%" }}
                mb={{ base: 12, md: 0 }}>
                <Img
                  src="/landing-page.png"
                  height="auto"
                  width="auto"
                  rounded="1rem"
                  shadow="2xl"
                  alt="Landing page"
                />
              </Box>
            </Flex>
          </Container> */}

          
          <Container py={{ base: "4", md: "12" }} maxW={"7xl"} id="getstarted">
            <HStack spacing={2}>
              <SkeletonCircle
                size="4"
                startColor="purple.500"
                endColor="orange.500"
              />
              <Heading as="h2" size="lg">
                How do I get Started with RajyaMudra?
              </Heading>
            </HStack>

            <Divider marginTop="4" />
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10} py={8}>
              <StarterCard
                icon={<Icon as={FcIdea} w={10} h={10} />}
                title={"Start your Campaign"}
                text={
                  "Provide the details for your campaign in the required fields and you are ready for the crowd funding process. 😁"
                }
              />
              <StarterCard
                icon={
                  <Icon as={BiNetworkChart} color={"blue.400"} w={10} h={10} />
                }
                title={"Publish and Promote your Campaign"}
                text={
                  "Publish the campaign on the platform and share your motivation with the world 🙌 and make yourself heard. 😉"
                }
              />
              <StarterCard
                icon={<Icon as={FcMoneyTransfer} w={10} h={10} />}
                title={"Request to Withdraw Funds"}
                text={
                  "You feel you need the raised money for usage? Get your funds by initiating a withdraw request and let your contributors vote."
                }
              />
              <StarterCard
                icon={<Icon as={FcApproval} w={10} h={10} />}
                title={"Get your request Approved"}
                text={
                  "Once 50% of the contributors approve your withdrawal request, you can finalize the request and withdraw the funds. 💰"
                }
              />
            </SimpleGrid>

          </Container>
        </Container>


        <Container py={{ base: "4", md: "12" }} maxW={"7xl"}>
          <HStack spacing={2}>
            <SkeletonCircle
              size="4"
              startColor="purple.500"
              endColor="orange.500"
            />
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
              <Skeleton
                height="25rem"
                startColor="purple.500"
                endColor="orange.500"></Skeleton>
              <Skeleton
                height="25rem"
                startColor="purple.500"
                endColor="orange.500"></Skeleton>
              <Skeleton
                height="25rem"
                startColor="purple.500"
                endColor="orange.500"></Skeleton>
            </SimpleGrid>
          )}
        </Container>
        <Divider marginTop="4" />

        <Heading as="h6" size="md" mt="8">
          For any queries raise an issue on{" "}
          <Link
            color="red.400"
            href="https://github.com/raghu-raj23/RajyaMudra/issues"
            isExternal>
            the Github Repo <ExternalLinkIcon mx="2px" />
          </Link>{" "}
        </Heading>
        <Heading as="h6" size="md" mt="8">
          Fork the project on{" "}
          <Link
            color="red.400"
            href="https://github.com/raghu-raj23/RajyaMudra/"
            isExternal>
            the Github Repo <ExternalLinkIcon mx="2px" />
          </Link>{" "}
        </Heading>
      </main>
    </div>
  );
}
