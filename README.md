# SiC Monorepo

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
