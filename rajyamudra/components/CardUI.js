import { FaEthereum } from "react-icons/fa";
import web3 from "../ethereum-contracts/web3";
import { getETHPrice, getWEIPriceInUSD } from "../utils/getETHPrice";
import {
  chakra,
  Heading,
  useColorModeValue,
  Text,
  Flex,
  Box,
  Img,
  Icon,
  Tooltip,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Progress,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import NextLink from "next/link";

export const StarterCard = ({ title, text, icon }) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        bg={useColorModeValue("gray.300", "gray.800")}
        mb={1}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={useColorModeValue("orange.500", "gray.200")}>{text}</Text>
    </Stack>
  );
};

export function CampaignCard({
  name,
  description,
  creatorId,
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
        shadow="lg"
        position="relative"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        transition={"transform 0.3s ease"}
        _hover={{
          transform: "scale(1.1)",
        }}>
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
            <CircularProgress
              value={web3.utils.fromWei(balance, "ether")}
              max={web3.utils.fromWei(target, "ether")}
              color="orange.400"
              thickness="12px"></CircularProgress>
          </Flex>
          <Flex alignContent="center" py={2}>
            {" "}
            <Text color={"orange.500"} pr={2}>
              by
            </Text>{" "}
            <Heading size="base" isTruncated>
              {creatorId}
            </Heading>
          </Flex>
          <Box
            fontSize="2xl"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated>
            {description}
          </Box>
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
            </Box>{" "}
          </Flex>
        </Box>
      </Box>
    </NextLink>
  );
}

export function StatsCard(props) {
  const { title, stat, info } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"sm"}
      border={"1px solid"}
      transition={"transform 0.3s ease"}
      _hover={{
        transform: "scale(1.1)",
      }}>
      <Tooltip
        label={info}
        bg={useColorModeValue("white", "gray.700")}
        placement={"top"}
        color={useColorModeValue("gray.800", "white")}
        fontSize={"1em"}>
        <Flex justifyContent={"space-between"}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={"medium"} isTruncated>
              {title}
            </StatLabel>
            <StatNumber
              fontSize={"base"}
              fontWeight={"bold"}
              isTruncated
              maxW={{ base: "	10rem", sm: "sm" }}>
              {stat}
            </StatNumber>
          </Box>
        </Flex>
      </Tooltip>
    </Stat>
  );
}
