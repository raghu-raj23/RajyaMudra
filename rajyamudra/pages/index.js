import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { getETHPrice, getWEIPriceInUSD } from "../utils/getETHPrice";
import {
  Heading,
  Container,
  SimpleGrid,
  Divider,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { BiNetworkChart } from "react-icons/bi";
import factory from "../ethereum-contracts/factory";
import Campaign from "../ethereum-contracts/campaign";
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
          <IndexCTA />
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
              Campaigns You Can Contribute
            </Heading>
          </HStack>

          <Divider marginTop="4" />

          {campaignList.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} py={8}>
              {campaignList.map((camp, i) => {
                return (
                  <div key={i}>
                    <CampaignCard
                      name={camp[5]}
                      description={camp[6]}
                      creatorId={camp[4]}
                      id={campaigns[i]}
                      target={camp[7]}
                      balance={camp[1]}
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
                endColor="orange.500">
                <SkeletonText
                  startColor="whiteAlpha.500"
                  endColor="blackAlpha.500"
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                />
              </Skeleton>
              <Skeleton
                height="25rem"
                startColor="purple.500"
                endColor="orange.500">
                <SkeletonText
                  startColor="whiteAlpha.500"
                  endColor="blackAlpha.500"
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                />
              </Skeleton>
              <Skeleton
                height="25rem"
                startColor="purple.500"
                endColor="orange.500">
                <SkeletonText
                  startColor="whiteAlpha.500"
                  endColor="blackAlpha.500"
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                />
              </Skeleton>
            </SimpleGrid>
          )}
        </Container>
      </main>
    </div>
  );
}
