# SiC Monorepo

## Getting started

### 1. Backend

Switch to the backend folder

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
# start app
$ yarn start
```

### Hardhat

```bash
# export abi
$ yarn run hardhat export-abi --no-compile
```
