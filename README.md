# SiC Monorepo

## About 

Many of us are part of web3 Communities. These Communities, DAOs, Protocols, and Public Goods generally struggle to promote themselves without relying on web2 models.

It is closed-sourced, privacy-invasive, and censors our thoughts and beliefs. Without the freedom to transact or speak, you have no other constitutional rights. 

To prevent you from seeing garbage tweets and botted Reddit posts, we enable you to experience a customizable social platform where you are in charge of what you want to see. 

SiC - Sharing is Caring is built on top of Lens Graph and allows you to identify users by their public interests and not sex/age/region and other private data like in web2. 

Sharing interest = showing interest

By showing interest and engaging with the content, you gain an influence to unlock access, get perks from your favorite community, or get rewards from participating in promotions. We allow you to promote content by putting programmable incentives for engagement - open-source and decentralized digital marketing. 

To balance incentivization and spamming, we want to put in the best anti-Sybil measurements, like only partaking in SiC if you have Proof-of-Humanity. 

We build a Dapp that keeps your reputation on-chain. It facilitates the evolution and natural propagation of memes. Network effects are built into the protocol. They track the popularity of any meme. It's birth, its exponential growth, and eventually death. 

You can post any content under a certain tag. There can be a hierarchy of tags. A Community can own a tag. You can own a tag. You are a tag. You trace the origin of every piece of content, so even if it gets reshared through all kinds of corners of the internet, you can find the origin of the Harold meme. 

We hope you find that SiC.

## The project

We've added a reputation model on top of the smart contracts 
of the [Lens Protocol](https://lens.xyz/).
See [packages/hardhat/contracts/core/modules/reference/ReputationModule.sol](packages/hardhat/contracts/core/modules/reference/ReputationModule.sol).

## Getting started

All commands should be done from the root directory.

### 1. Compile the smart contract and deploy the example

```bash
# install dependencies
yarn

# compiles contracts
yarn compile

# start a local node
yarn hardhat:node

# deploy lens contracts
yarn hardhat:full-deploy-local

# deploy scripts/tests (modules)
# TODO: Error: Unrecognized task test-module
yarn hardhat:test-module:localhost
```

### 2. Start the frontend server

```bash
# IMPORTANT!!
rm packages/react-app/tsconfig.json && rm packages/react-app/src/react-app-env.d.ts
cp packages/hardhat/addresses.json packages/react-app/src
cp -r packages/hardhat/typechain-types packages/react-app/src

# start frontend application
yarn start
```
