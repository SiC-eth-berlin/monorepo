// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import {IReferenceModule} from '../../../interfaces/IReferenceModule.sol';
import {ModuleBase} from '../ModuleBase.sol';
import {FollowValidationModuleBase} from '../FollowValidationModuleBase.sol';
import {ILensHub} from '../../../interfaces/ILensHub.sol';

contract ReputationModule is IReferenceModule, ModuleBase {

    address hubAddress;

    // mapping(profileID => rep)
    // mapping(userID => rep)
    mapping(uint256 => uint256) internal _userToReputation;

    // Lens postID
    uint256 internal tagID;

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

        // If publication is post/tag we don't want to do anything
        if (parentProfileIdPointed == 0x0 && parentPubIdPointed == 0x0)
            return;

        if (profileIdPointed != lastCommenter)
            _userToReputation[profileIdPointed] = _userToReputation[profileIdPointed] + reputation;

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

        _processComment(profileId, profileId, profileIdPointed, pubIdPointed, data, 2**7);
    }

    function processMirror(
        uint256 profileId,
        uint256 profileIdPointed,
        uint256 pubIdPointed,
        bytes calldata data
    ) external override {
        
    }

    function getReputation(
        uint256 profileId
    ) external view returns(uint256 reputation) {
        return _userToReputation[profileId];
    }
}