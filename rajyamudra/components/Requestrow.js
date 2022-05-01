import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import web3 from "../ethereum-contracts/web3";
import Campaign from "../ethereum-contracts/campaign";
import { getWEIPriceInUSD } from "../utils/getETHPrice";
import {
  useColorModeValue,
  Button,
  Tooltip,
  Tr,
  Td,
  HStack,
  Link,
} from "@chakra-ui/react";
import { InfoIcon, CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";

export const RequestRow = ({
  id,
  request,
  approversCount,
  campaignId,
  disabled,
  ETHPrice,
}) => {
  const router = useRouter();
  const readyToFinalize = request.approvalCount > approversCount / 2;
  const [errorMessageApprove, setErrorMessageApprove] = useState();
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [errorMessageFinalize, setErrorMessageFinalize] = useState();
  const [loadingFinalize, setLoadingFinalize] = useState(false);

  const onApprove = async () => {
    setLoadingApprove(true);
    try {
      const campaign = Campaign(campaignId);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(id).send({
        from: accounts[0],
      });
      router.reload();
    } catch (err) {
      setErrorMessageApprove(err.message);
    } finally {
      setLoadingApprove(false);
    }
  };

  const onFinalize = async () => {
    setLoadingFinalize(true);
    try {
      const campaign = Campaign(campaignId);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finalizeRequest(id).send({
        from: accounts[0],
      });
      router.reload();
    } catch (err) {
      setErrorMessageFinalize(err.message);
    } finally {
      setLoadingFinalize(false);
    }
  };

  return (
    <Tr
      bg={
        readyToFinalize && !request.complete
          ? useColorModeValue("orange.100", "orange.700")
          : useColorModeValue("gray.100", "gray.700")
      }
      opacity={request.complete ? "0.5" : "1"}>
      <Td>{id} </Td>
      <Td>{request.description}</Td>
      <Td isNumeric>
        {web3.utils.fromWei(request.value, "ether")}ETH ($
        {getWEIPriceInUSD(ETHPrice, request.value)})
      </Td>
      <Td>
        <Link
          color="orange.500"
          href={`https://rinkeby.etherscan.io/address/${request.recipient}`}
          isExternal>
          {" "}
          {request.recipient.substr(0, 10) + "..."}
        </Link>
      </Td>
      <Td>
        {request.approvalCount} of {approversCount}
      </Td>
      <Td>
        <HStack spacing={2}>
          <Tooltip
            label={errorMessageApprove}
            bg={useColorModeValue("white", "gray.700")}
            placement={"top"}
            color={useColorModeValue("gray.800", "white")}
            fontSize={"1em"}>
            <WarningIcon
              color={useColorModeValue("red.600", "red.300")}
              display={errorMessageApprove ? "inline-block" : "none"}
            />
          </Tooltip>
          {request.complete ? (
            <Tooltip
              label="Request is finalized and withdrawn"
              bg={useColorModeValue("white", "gray.700")}
              placement={"top"}
              color={useColorModeValue("gray.800", "white")}
              fontSize={"1em"}>
              <CheckCircleIcon
                color={useColorModeValue("green.600", "green.300")}
              />
            </Tooltip>
          ) : (
            <Button
              colorScheme="yellow"
              variant="outline"
              _hover={{
                bg: "yellow.600",
                color: "white",
              }}
              onClick={onApprove}
              isDisabled={disabled || request.approvalCount == approversCount}
              isLoading={loadingApprove}>
              Approve
            </Button>
          )}
        </HStack>
      </Td>
      <Td>
        <Tooltip
          label={errorMessageFinalize}
          bg={useColorModeValue("white", "gray.700")}
          placement={"top"}
          color={useColorModeValue("gray.800", "white")}
          fontSize={"1em"}>
          <WarningIcon
            color={useColorModeValue("red.600", "red.300")}
            display={errorMessageFinalize ? "inline-block" : "none"}
            mr="2"
          />
        </Tooltip>
        {request.complete ? (
          <Tooltip
            label="Request is finalized and withdrawn"
            bg={useColorModeValue("white", "gray.700")}
            placement={"top"}
            color={useColorModeValue("gray.800", "white")}
            fontSize={"1em"}>
            <CheckCircleIcon
              color={useColorModeValue("green.600", "green.300")}
            />
          </Tooltip>
        ) : (
          <HStack spacing={2}>
            <Button
              colorScheme="green"
              variant="outline"
              _hover={{
                bg: "green.600",
                color: "white",
              }}
              isDisabled={disabled || (!request.complete && !readyToFinalize)}
              onClick={onFinalize}
              isLoading={loadingFinalize}>
              Finalize
            </Button>

            <Tooltip
              label="Request ready to be finalized"
              bg={useColorModeValue("white", "gray.700")}
              placement={"top"}
              color={useColorModeValue("gray.800", "white")}
              fontSize={"1.2em"}>
              <InfoIcon
                as="span"
                color={useColorModeValue("orange.800", "white")}
                display={
                  readyToFinalize && !request.complete ? "inline-block" : "none"
                }
              />
            </Tooltip>
          </HStack>
        )}
      </Td>
    </Tr>
  );
};
