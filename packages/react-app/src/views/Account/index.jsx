import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { useEventListener } from 'eth-hooks/events/useEventListener';

import { DarkContainer, Button, Badge } from '../../components/tailwind';

export default function Account({ localProvider, lensContracts, address, price, gasPrice }) {
  return (
    <Row gutter={[16, 24]} className="py-4">
      <Col className="gutter-row" md={8} xs={24}>
        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
          <div className="w-full text-black dark:text-white">
            <DarkContainer className="mb-2">
              <div className="flex justify-center text-lg">Account</div>
            </DarkContainer>
            <Button color="blue" onClick={() => console.log('click')}>
              Click me
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
}
