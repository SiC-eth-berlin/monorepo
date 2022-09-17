# SiC Monorepo

## Backend

Switch to the backend folder

```bash
# install ddependenciese
$ yarn

# 1. Terminal
# start a local node
$ yarn compile

# 2. Terminal
# compile
$ cd packages/hardhat && npx hardhat node

# deploy lens contracts
$ yarn full-deploy-local

# deploy scripts/tests (modules)
# TODO: Error: Unrecognized task test-module
$ npx hardhat test-module --network localhost
```

## Frontend

## Getting started

```bash
# start app
$ yarn start
```
