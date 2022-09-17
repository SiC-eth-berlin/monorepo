import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { useEventListener } from 'eth-hooks/events/useEventListener';

import { DarkContainer, Button, Badge } from '../../components/tailwind';
import LocalSignerCard from './LocalSigner';

export default function Home({
  localProvider,
  readContracts,
  writeContracts,
  lensContracts,
  address,
  price,
  gasPrice,
}) {
  const [balance, setBalance] = useState();

  useEffect(() => {
    async function getBalance() {
      const reputation = await lensContracts.ReputationModuleFactory.getReputation('1');
      console.log('RESULT:');
      console.log({ reputation });
      //const balance = await lensContracts.LensHub.balanceOf(address);
      //console.log({ balance, reputation });
      setBalance(balance);
    }
    getBalance();
  }, [localProvider]);

  console.log({ lensContracts });
  console.log({ balance });
  return (
    <Row gutter={[16, 24]} className="py-4">
      <Col className="gutter-row" md={8} xs={24}>
        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
          <div className="w-full text-black dark:text-white">
            <DarkContainer className="mb-2">
              <div className="flex justify-center text-lg">Hello</div>
            </DarkContainer>
            <Button color="blue" onClick={() => console.log('click')}>
              Click me
            </Button>
          </div>
        </div>
      </Col>
      <Col className="gutter-row" md={8} xs={24}>
        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
          <div className="w-full text-black dark:text-white">
            <DarkContainer className="mb-2">
              <div className="flex justify-center text-lg">World</div>
            </DarkContainer>
            <Button color="blue" onClick={() => console.log('click 2')}>
              Click me 2
            </Button>
          </div>
        </div>
      </Col>
      <Col className="gutter-row" md={8} xs={24}>
        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
          <LocalSignerCard
            localProvider={localProvider}
            readContracts={readContracts}
            writeContracts={writeContracts}
            address={address}
            price={price}
            gasPrice={gasPrice}
          />
        </div>
      </Col>
    </Row>
  );
}
