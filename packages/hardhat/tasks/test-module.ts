import { ethers } from 'ethers';
import { defaultAbiCoder } from 'ethers/lib/utils';
import { task } from 'hardhat/config';
import { LensHub__factory, ReputationModule__factory } from '../typechain-types';
import {
  CreateProfileDataStruct,
  PostDataStruct,
  CommentDataStruct,
} from '../typechain-types/LensHub';
import {} from '../typechain-types/LensHub';
import {
  waitForTx,
  initEnv,
  getAddrs,
  ProtocolState,
  ZERO_ADDRESS,
  deployContract,
} from './helpers/utils';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

task('test-module', 'test the reputation modul').setAction(async ({}, hre) => {
  const [governance, , user] = await initEnv(hre);
  const addrs = getAddrs();
  const freeCollectModule = addrs['free collect module'];
  const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);

  await waitForTx(lensHub.setState(ProtocolState.Unpaused));
  await waitForTx(lensHub.whitelistCollectModule(freeCollectModule, true));
  await waitForTx(lensHub.whitelistProfileCreator(user.address, true));

  for (let i = 0; i < 10; i++) {
    console.log('creating profile' + i + '...');
    const inputStruct: CreateProfileDataStruct = {
      to: user.address,
      handle: 'profile' + i,
      imageURI:
        'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan',
      followModule: ZERO_ADDRESS,
      followModuleInitData: [],
      followNFTURI:
        'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan',
    };
    await waitForTx(lensHub.connect(user).createProfile(inputStruct));
  }

  const reputationModule = await deployContract(
    new ReputationModule__factory(governance).deploy(lensHub.address)
  );

  await waitForTx(
    lensHub.connect(governance).whitelistReferenceModule(reputationModule.address, true)
  );

  for (let i = 0; i < 10; i++) {
    console.log('creating post ' + i + '(tag)...');
    console.log('tag' + i);
    const postDataStruct: PostDataStruct = {
      profileId: i + 1,
      contentURI: 'tag' + i,
      collectModule: freeCollectModule,
      collectModuleInitData: defaultAbiCoder.encode(['bool'], [true]),
      referenceModule: reputationModule.address,
      referenceModuleInitData: [],
    };

    await waitForTx(lensHub.connect(user).post(postDataStruct));
  }

  for (let i = 0; i < 100; i++) {
    const profileId = getRandomInt(1, 11);
    const profileIdPointed = getRandomInt(1, 11);
    let max = i / 10;
    if (max < 1) max = 1;
    const pubIdPointed = getRandomInt(1, max);

    console.log('creating comment:' + i);
    const commentDataStruct: CommentDataStruct = {
      profileId: profileId,
      contentURI: 'comment' + i,
      profileIdPointed: profileIdPointed,
      pubIdPointed: pubIdPointed,
      referenceModuleData: [],
      collectModule: freeCollectModule,
      collectModuleInitData: defaultAbiCoder.encode(['bool'], [true]),
      referenceModule: reputationModule.address,
      referenceModuleInitData: [],
    };

    try {
      await waitForTx(lensHub.connect(user).comment(commentDataStruct));
    } catch (error) {
      console.log('failed creating comment, skipping..');
    }
  }

  console.log(ethers.BigNumber.from(await reputationModule.getReputation(1)).toNumber());
});
