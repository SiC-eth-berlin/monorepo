import React from 'react';
import { useContractReader } from 'eth-hooks';
import Balance from '../../components/Balance';
import { DarkContainer, Badge } from '../../components/tailwind';

export default function LocalSignerCard({
  localProvider,
  readContracts,
  writeContracts,
  address: localAddress,
  price,
  gasPrice,
}) {
  return (
    <div className="w-full text-black dark:text-white">
      <DarkContainer className="mb-2">
        <div className="flex justify-center text-lg">Local Signer</div>
      </DarkContainer>

      <DarkContainer className="mb-2">
        <div className="flex justify-center">
          <Badge>ETH balance</Badge>
        </div>

        <div className="flex justify-center pt-4 font-bold text-xl">
          <Balance address={localAddress} provider={localProvider} price={price} textSize="text-base" />
        </div>
      </DarkContainer>
    </div>
  );
}
