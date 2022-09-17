import { ethers } from 'ethers';
import { defaultAbiCoder } from 'ethers/lib/utils';
import { task } from 'hardhat/config';
import {
    LensHub__factory,
    ReputationModule__factory,
} from '../typechain-types';
import { 
    CreateProfileDataStruct,
    PostDataStruct,
    CommentDataStruct
} from '../typechain-types/LensHub';
import {  } from '../typechain-types/LensHub';
import {
    waitForTx,
    initEnv,
    getAddrs,
    ProtocolState,
    ZERO_ADDRESS,
    deployContract,
} from './helpers/utils';

task('test-module', 'test the reputation modul').setAction(async ({}, hre) => {
    const [governance, , user] = await initEnv(hre);
    const addrs = getAddrs();
    const freeCollectModule = addrs['free collect module'];
    const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);

    await waitForTx(lensHub.setState(ProtocolState.Unpaused));
    await waitForTx(lensHub.whitelistCollectModule(freeCollectModule, true));
    await waitForTx(lensHub.whitelistProfileCreator(user.address, true));

    console.log('creating profile...');

    const inputStruct: CreateProfileDataStruct = {
        to: user.address,
        handle: 'zer0dot',
        imageURI:
            'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan',
        followModule: ZERO_ADDRESS,
        followModuleInitData: [],
        followNFTURI:
            'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan',
    };
    await waitForTx(lensHub.connect(user).createProfile(inputStruct));

    const reputationModule = await deployContract(
        new ReputationModule__factory(governance).deploy(lensHub.address)
    );

    await waitForTx(lensHub.connect(governance).whitelistReferenceModule(reputationModule.address, true));

    console.log('creating post...');
    const postDataStruct: PostDataStruct = {
        profileId: 1,
        contentURI: "ipfs://blarg",
        collectModule: freeCollectModule,
        collectModuleInitData: defaultAbiCoder.encode(['bool'], [true]),
        referenceModule: reputationModule.address,
        referenceModuleInitData: []
    }

    await waitForTx(lensHub.connect(user).post(postDataStruct));

    console.log('creating comment...');
    const commentDataStruct: CommentDataStruct = {
        profileId: 1,
        contentURI: "ipfs://blarg",
        profileIdPointed: 1,
        pubIdPointed: 1,
        referenceModuleData: [],
        collectModule: freeCollectModule,
        collectModuleInitData: defaultAbiCoder.encode(['bool'], [true]),
        referenceModule: reputationModule.address,
        referenceModuleInitData: []
    };

    console.log(ethers.BigNumber.from(await reputationModule.getReputation(1)).toNumber());

    await waitForTx(lensHub.connect(user).comment(commentDataStruct));
    
    console.log(ethers.BigNumber.from(await reputationModule.getReputation(1)).toNumber());

    await waitForTx(lensHub.connect(user).comment(
        {
            profileId: 1,
            contentURI: "ipfs://blarg",
            profileIdPointed: 1,
            pubIdPointed: 2,
            referenceModuleData: [],
            collectModule: freeCollectModule,
            collectModuleInitData: defaultAbiCoder.encode(['bool'], [true]),
            referenceModule: reputationModule.address,
            referenceModuleInitData: []
        }
    ));
    
    console.log(ethers.BigNumber.from(await reputationModule.getReputation(1)).toNumber());
});