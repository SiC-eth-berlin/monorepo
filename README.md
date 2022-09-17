# SiC Monorepo

## The project

We've added a reputation model ontop of the smart contracts of the [Lens Protocol](https://lens.xyz/).
See `packages/hardhat/contracts/core/modules/reference/ReputationModule.sol`.

## Getting started

### 1. Backend

Cd in into the backend folder

```bash
# install ddependenciese
$ yarn

# 1. Terminal
# compile
$ yarn compile

# 2. Terminal
# start a local node
$ yarn hardhat:node

# deploy lens contracts
$ yarn hardhat:full-deploy-local

# deploy scripts/tests (modules)
# TODO: Error: Unrecognized task test-module
$ yarn hardhat:test-module:localhost
```

### 2. Frontend

```bash
# IMPORTANT!!

first
delete `react-app/tsconfig.json` and `react-app/src/react-app-env.d.ts`

# start app
$ yarn start
```

### Hardhat

```bash
# export abi
$ yarn run hardhat export-abi --no-compile
```
