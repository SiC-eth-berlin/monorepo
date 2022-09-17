// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import {IReferenceModule} from '../../../interfaces/IReferenceModule.sol';
import {ModuleBase} from '../ModuleBase.sol';
import {FollowValidationModuleBase} from '../FollowValidationModuleBase.sol';
import {ILensHub} from '../../../interfaces/ILensHub.sol';

contract ReputationModule is IReferenceModule, ModuleBase {

    address hubAddress;

    uint256 tagID;

    // mapping(profileID => rep)
    // mapping(userID => rep)
    mapping(uint256 => uint256) internal _userToReputation;

    // comments to lens first grade comments 
    mapping(uint256 => uint256) internal _reshareIDToPostID;

    // lens 1.st grade comment to owner id
    mapping(uint256 => uint256) internal _postIdToOwnerID;

    // lens 1.st grade comment to address
    mapping(uint256 => address) internal _postIdToAddress;

    struct Premium {
        uint256 blockheight;
        uint256 premiumAmount;
    }

    // lens 1.st grade comment to premium amount
    mapping(uint256 => Premium) internal _postIdToPremium;

    struct Contributooor {
        uint256 profileId;
        address payable owner;
    }

    // lens 1.st grade comment to list of contributooors
    mapping(uint256 => Contributooor[]) internal _postIdToContributooors;

    //total Baance of all premium in this contract
    uint256 totalBalance;

    //postID to total Postreputation
    mapping(uint256 => uint256) internal _postIdToPostReputation;

    constructor(address hub) ModuleBase(hub) {}

    function initializeReferenceModule(
        uint256 profileId,
        uint256 pubId,
        bytes calldata data
    ) external override returns (bytes memory) {
        tagID = pubId;
    }

    function _processComment(
        uint256 lastCommenter,
        uint256 profileId,
        uint256 profileIdPointed,
        uint256 pubIdPointed,
        bytes calldata data,
        uint256 reputation
    ) internal {

        uint256 parentProfileId;
        uint256 parentProfileIdPointed;
        uint256 parentPubIdPointed;

        (parentProfileIdPointed, parentPubIdPointed) = ILensHub(HUB).getPubPointer(profileIdPointed, pubIdPointed);

        // If publication is lens post/tag we don't want to do anything
        if (parentProfileIdPointed == 0x0 && parentPubIdPointed == 0x0)
            return;


        if (profileIdPointed != lastCommenter) {
            //if the user has no reputation add them as a contributooor
            if (_userToReputation[profileIdPointed] == 0) {
                Contributooor memory contributooor = Contributooor(profileIdPointed,payable(msg.sender));
                _postIdToContributooors[_reshareIDToPostID[pubIdPointed]].push(contributooor);
            }
            _userToReputation[profileIdPointed] = _userToReputation[profileIdPointed] + reputation;

            //add reputation to the total reputation of that post.
            _postIdToPostReputation[_reshareIDToPostID[pubIdPointed]] += reputation;

        }

        parentProfileId = profileIdPointed;
        

        if (reputation == 1)
            return;

        _processComment(lastCommenter, parentProfileId, parentProfileIdPointed, parentPubIdPointed, data, reputation >> 1);
    }

    function processComment(
        uint256 profileId,
        uint256 profileIdPointed,
        uint256 pubIdPointed,
        bytes calldata data
    ) external override {
        uint256 parentProfileIdPointed;
        uint256 parentPubIdPointed;


        (parentProfileIdPointed, parentPubIdPointed) = ILensHub(HUB).getPubPointer(profileIdPointed, pubIdPointed);

        // if Parent is Lens Post than this comment is first order comment
        if (parentProfileIdPointed == 0x0 && parentPubIdPointed == 0x0) {
            // assign the postID to itself
            _reshareIDToPostID[pubIdPointed] = pubIdPointed;
            //assign the tagID to the owner of the lens post / tag
            _postIdToOwnerID[parentPubIdPointed] = parentProfileIdPointed;
            //assign msg.sender to the owner of the lens post / tag
            _postIdToAddress[parentPubIdPointed] = msg.sender;
        }
        else {
            _reshareIDToPostID[pubIdPointed] = _reshareIDToPostID[parentPubIdPointed];
        }

        _processComment(profileId, profileId, profileIdPointed, pubIdPointed, data, 2**7);
    }

    function processMirror(
        uint256 profileId,
        uint256 profileIdPointed,
        uint256 pubIdPointed,
        bytes calldata data
    ) external override {
        
    }

    function createPremium(
        uint256 time,
        uint256 pubIdPointed // postID
    ) payable external {
        require(msg.sender == _postIdToAddress[pubIdPointed]);
        //create premium...
        Premium memory premium = Premium(time + block.number, pubIdPointed);
        _postIdToPremium[pubIdPointed] = premium;

        totalBalance += msg.value;
    }

    function collectPremium (
        uint256 pubIdPointed // postID
    ) external {
        require( block.number > _postIdToPremium[pubIdPointed].blockheight);

        uint256 premium = _postIdToPremium[pubIdPointed].premiumAmount;

        for (uint i=0; i<_postIdToContributooors[pubIdPointed].length; i++) {
            Contributooor memory contributooor = _postIdToContributooors[pubIdPointed][i];
            uint256 totalPostReputation = _postIdToPostReputation[pubIdPointed];
            uint256 premiumShare = (premium * _userToReputation[_postIdToContributooors[pubIdPointed][i].profileId]) / totalPostReputation;

            address payable contributooorAddress = contributooor.owner;
            contributooorAddress.transfer(premiumShare); 
            totalBalance -= premiumShare; 
        }
    }

    function getReputation(
        uint256 profileId
    ) external view returns(uint256 reputation) {
        return _userToReputation[profileId];
    }
}