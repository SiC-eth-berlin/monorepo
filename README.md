# SiC Monorepo

## Backend

Switch to the backend folder

```bash
# install ddependenciese
$ yarn

# 1. Terminal
# start a local node
$ cd packages/hardhat && npx hardhat node

# 2. Terminal
# compile
$ yarn compile

# deploy lens
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
