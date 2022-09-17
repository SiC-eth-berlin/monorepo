# monorepo

## backend

Switch to the backend folder

```shell
cd backend
```

Start a local node in one shell

```shell
npx hardhat node 
```

Open another shell

Compile the code

```shell
npm run compile
```

Deploy lens

```shell
npm run full-deploy-local
```

Deploy scripts/tests (modules)

```shell
npx hardhat test-module --network localhost
```
