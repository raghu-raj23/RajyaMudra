// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    // function createCampaign(uint minimum,string name,string description,string image,uint target) public {
    function createCampaign(uint minimum,string name,string description,uint target) public {
        address newCampaign = new Campaign(minimum, msg.sender,name,description,target);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}


contract Campaign {
  struct Request {
      string description;
      uint value;
      address recipient;
      bool complete;
      uint approvalCount;
      mapping(address => bool) approvals;
  }

  Request[] public requests;
  address public manager;
  uint public minimunContribution;
  string public CampaignName;
  string public CampaignDescription;
  // string public imageUrl;
  uint public targetToAchieve;
  address[] public contributers;
  mapping(address => bool) public approvers;
  uint public approversCount;


  modifier restricted() {
      require(msg.sender == manager, "Only the manager can perform this action");
      _;
  }

  // constructor(uint minimun, address creator,string name,string description,string image,uint target) public {
  constructor(uint minimun, address creator,string name,string description,uint target) public {
      manager = creator;
      minimunContribution = minimun;
      CampaignName=name;
      CampaignDescription=description;
      // imageUrl=image;
      targetToAchieve=target;
  }

  function contibute() public payable {
      require(msg.value >= minimunContribution,"Contribution is less than the minimun");

      contributers.push(msg.sender);
      if(approvers[msg.sender]!= true){
            approvers[msg.sender] = true;
            approversCount++;
        }
  }

  function createRequest(string description, uint value, address recipient) public restricted {
      Request memory newRequest = Request({
         description: description,
         value: value,
         recipient: recipient,
         complete: false,
         approvalCount: 0
      });

      requests.push(newRequest);
  }

  function approveRequest(uint index) public {
      require(approvers[msg.sender],"You must be an approver to approve a request");
      require(!requests[index].approvals[msg.sender],"You have already approved this request");

      requests[index].approvals[msg.sender] = true;
      requests[index].approvalCount++;
  }

  function finalizeRequest(uint index) public restricted{
      require(requests[index].approvalCount > (approversCount / 2),"Insufficient approvals to finalize request");
      require(!requests[index].complete,"Request already finalized");

      requests[index].recipient.transfer(requests[index].value);
      requests[index].complete = true;

  }


    // function getSummary() public view returns (uint,uint,uint,uint,address,string,string,string,uint) {
    function getSummary() public view returns (uint,uint,uint,uint,address,string,string,uint) {
        return(
            minimunContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager,
            CampaignName,
            CampaignDescription,
            // imageUrl,
            targetToAchieve
          );
    }

    function getRequestsCount() public view returns (uint){
        return requests.length;
    }
}
