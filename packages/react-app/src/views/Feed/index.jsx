import React, { useState, useEffect } from 'react';
import { Row, Col, Collapse } from 'antd';
import { useEventListener } from 'eth-hooks/events/useEventListener';
import { ShareIcon } from '@heroicons/react/outline';

import { DarkContainer, Button, Badge } from '../../components/tailwind';

const { Panel } = Collapse;

// merge ethberlin harold

const TAGS_DUMMY_DATA = [
  {
    name: 'merge',
    posts: [
      {
        title: 'SPARTAAA',
        uri: 'https://bafybeidjjog7rbuhcsfpmb5nt2jrilpwt6bm64ubquxqpakswiks56f2mu.ipfs.w3s.link/ipfs/bafybeidjjog7rbuhcsfpmb5nt2jrilpwt6bm64ubquxqpakswiks56f2mu/index.jpeg',
        comments: [
          { id: 1, text: 'Finally it happened..' },
          { id: 2, text: 'ETH to the moon!' },
        ],
      },
      {
        title: 'yeah baby',
        uri: 'https://ipfs.io/ipfs/bafybeihtkaci7y6whmn5nfjessvum3xfoqletybynsf2wuihcc76vhth3a/QmPqikpzDj4s63a5KMqojJmvzzjugMnCNDSvRDV754jPjE.png',
        comments: [],
        bounty: '0.5 ETH',
      },
      {
        title: 'accepted',
        uri: 'https://bafybeibxpy3ctnimnzykkvrqnrd37puxdjukottvvsugrgxe57pvrle544.ipfs.w3s.link/ipfs/bafybeibxpy3ctnimnzykkvrqnrd37puxdjukottvvsugrgxe57pvrle544/index.jpeg',
        comments: [],
      },
      {
        title: 'your girlfriend',
        uri: 'https://bafybeibhpmjvznkrvs4bv2rdmrads2yag7sik5q3iygnoa5rvprpp6hzl4.ipfs.w3s.link/ipfs/bafybeibhpmjvznkrvs4bv2rdmrads2yag7sik5q3iygnoa5rvprpp6hzl4/photo_2022-09-17_20-31-44.jpg',
        comments: [],
      },
      {
        title: 'I can code',
        uri: 'https://bafybeifbgz45abnc3qxfqfreu2jv5klj3mvn4mrj33djs3y4lzeleguweu.ipfs.w3s.link/ipfs/bafybeifbgz45abnc3qxfqfreu2jv5klj3mvn4mrj33djs3y4lzeleguweu/photo_2022-09-17_20-31-41.jpg',
        comments: [],
        bounty: '0.25 ETH',
      },
      {
        title: 'security',
        uri: 'https://bafybeigjwp53x6456esp3e4yxyceru6a7nygm6bzkpx6umvtgpzzdff4vy.ipfs.w3s.link/ipfs/bafybeigjwp53x6456esp3e4yxyceru6a7nygm6bzkpx6umvtgpzzdff4vy/photo_2022-09-17_20-31-38.jpg',
        comments: [],
        bounty: '0.25 ETH',
      },
      {
        title: 'C pointer',
        uri: 'https://bafybeicw6d25qug2hn5c6mixtpifwtjiekpji3wypz5me4b6jesgskyq5e.ipfs.w3s.link/ipfs/bafybeicw6d25qug2hn5c6mixtpifwtjiekpji3wypz5me4b6jesgskyq5e/photo_2022-09-17_20-31-27.jpg',
        comments: [],
      },
    ],
  },
  {
    name: 'ETHBerlin',
    posts: [
      {
        title: 'where is he?',
        uri: 'https://bafybeifppo2nzan32hmmrmfehpjhf6cfkpwtql5r72ptuhhrsgadepiwwq.ipfs.w3s.link/QmcTNiCQxWeffQSEekJkUhJU61qPe7VjFKZzZExCGZJCxd.jpeg',
        comments: [],
      },
      {
        title: 'speak',
        uri: 'https://bafybeickfehl4isxa4dndy2jgsuqjh5rxdtkcz3akvnm3ztsnbun7uvri4.ipfs.w3s.link/ipfs/bafybeickfehl4isxa4dndy2jgsuqjh5rxdtkcz3akvnm3ztsnbun7uvri4/index.jpeg',
        comments: [],
      },
      {
        title: 'NFT is art',
        uri: 'https://bafybeigy55sofjcicr7oojtwqzri63jt76jh5iignhtlahdnzfzoljhrx4.ipfs.w3s.link/ipfs/bafybeigy55sofjcicr7oojtwqzri63jt76jh5iignhtlahdnzfzoljhrx4/photo_2022-09-17_20-31-29.jpg',
        comments: [],
        bounty: '1 ETH',
      },
      {
        title: 'bashing',
        uri: 'https://bafybeia6aszsp746yanbk5oamkxjklinhtggtre4mdlxa3vpjhquklprci.ipfs.w3s.link/ipfs/bafybeia6aszsp746yanbk5oamkxjklinhtggtre4mdlxa3vpjhquklprci/photo_2022-09-17_20-31-40.jpg',
        comments: [],
      },
      {
        title: 'fuuuuuu',
        uri: 'https://bafybeidbwqnjr4xk5e6ldznwbqzf4gktyr6opay7u5ljsognzxxykxf7o4.ipfs.w3s.link/ipfs/bafybeidbwqnjr4xk5e6ldznwbqzf4gktyr6opay7u5ljsognzxxykxf7o4/photo_2022-09-17_20-31-35.jpg',
        comments: [],
        bounty: '0.25 ETH',
      },
    ],
  },
  {
    name: 'harold',
    posts: [
      {
        title: 'sweet boy',
        uri: 'https://bafybeid742b7536ltdd6lyfvmi5fnsljkadx5dhfywtfakdwy35rdogjs4.ipfs.w3s.link/ipfs/bafybeid742b7536ltdd6lyfvmi5fnsljkadx5dhfywtfakdwy35rdogjs4/index.jpeg',
        comments: [],
      },
      {
        title: 'girly',
        uri: 'https://bafybeihfgwonqvpebo5o55anbsjswgzfqkkbjclhstbm5xmhyoskuucqhm.ipfs.w3s.link/ipfs/bafybeihfgwonqvpebo5o55anbsjswgzfqkkbjclhstbm5xmhyoskuucqhm/index.jpeg',
        comments: [],
      },
      {
        title: 'where is harold',
        uri: 'https://bafybeifppo2nzan32hmmrmfehpjhf6cfkpwtql5r72ptuhhrsgadepiwwq.ipfs.w3s.link/QmcTNiCQxWeffQSEekJkUhJU61qPe7VjFKZzZExCGZJCxd.jpeg',
        comments: [],
      },
    ],
  }
]

// const TAGS_DUMMY_DATA = [
//   {
//     name: 'tag1',
//     posts: [
//       {
//         title: 'post 1',
//         uri: 'https://bafybeifrcl6dgabghbhmg2idyvjypen6r5bxwrminhucadey2iz3bv7xna.ipfs.w3s.link/QmXcxxWozkiKVvUKxxsFhkSjzFyFYEMSzS9TWM3hYrmkU4.png',
//         comments: [
//           { id: 1, text: 'a cool comment 1' },
//           { id: 2, text: 'a cool comment 2' },
//         ],
//       },
//       {
//         title: 'post 2',
//         uri: 'https://ipfs.io/ipfs/bafybeihtkaci7y6whmn5nfjessvum3xfoqletybynsf2wuihcc76vhth3a/QmPqikpzDj4s63a5KMqojJmvzzjugMnCNDSvRDV754jPjE.png',
//         comments: [],
//         bounty: '0.5 ETH',
//       },
//       {
//         title: 'post 3',
//         uri: 'https://bafybeibgtrdg6eha5av5utkw36pnjxhj2pfre326qfemkqk5jcjc2hd6gi.ipfs.w3s.link/ipfs/bafybeibgtrdg6eha5av5utkw36pnjxhj2pfre326qfemkqk5jcjc2hd6gi/photo_2022-09-17_20-31-58.jpg',
//         comments: [],
//       },
//       {
//         title: 'post 4',
//         uri: 'https://bafybeibhpmjvznkrvs4bv2rdmrads2yag7sik5q3iygnoa5rvprpp6hzl4.ipfs.w3s.link/ipfs/bafybeibhpmjvznkrvs4bv2rdmrads2yag7sik5q3iygnoa5rvprpp6hzl4/photo_2022-09-17_20-31-44.jpg',
//         comments: [],
//       },
//       {
//         title: 'post 5',
//         uri: 'https://bafybeiagzbk4tbokn4m2dnsshvplpnktlo3r42fxvjkhcmytc2w5kpumrq.ipfs.w3s.link/ipfs/bafybeiagzbk4tbokn4m2dnsshvplpnktlo3r42fxvjkhcmytc2w5kpumrq/photo_2022-09-17_20-31-31.jpg',
//         comments: [],
//       },
//       {
//         title: 'post 6',
//         uri: 'https://bafybeigx74eghyfk5w2lwmf34g2nglrfvxwddotuccyxuhuaeqkdbnnyba.ipfs.w3s.link/ipfs/bafybeigx74eghyfk5w2lwmf34g2nglrfvxwddotuccyxuhuaeqkdbnnyba/photo_2022-09-17_20-31-37.jpg',
//         comments: [],
//       },
//       {
//         title: 'post 7',
//         uri: 'https://bafybeifbgz45abnc3qxfqfreu2jv5klj3mvn4mrj33djs3y4lzeleguweu.ipfs.w3s.link/ipfs/bafybeifbgz45abnc3qxfqfreu2jv5klj3mvn4mrj33djs3y4lzeleguweu/photo_2022-09-17_20-31-41.jpg',
//         comments: [],
//         bounty: '0.25 ETH',
//       },
//     ],
//   },
//   {
//     name: 'tag2',
//     posts: [
//       {
//         title: 'post 2-1',
//         uri: 'https://bafybeifrcl6dgabghbhmg2idyvjypen6r5bxwrminhucadey2iz3bv7xna.ipfs.w3s.link/QmXcxxWozkiKVvUKxxsFhkSjzFyFYEMSzS9TWM3hYrmkU4.png',
//         comments: [],
//       },
//       {
//         title: 'post 2-2',
//         uri: 'https://bafybeif62mxbpkxxwsrzm72tnudxqinuz4ckes4k5tv7da3s44rmpaebom.ipfs.w3s.link/ipfs/bafybeif62mxbpkxxwsrzm72tnudxqinuz4ckes4k5tv7da3s44rmpaebom/photo_2022-09-17_20-31-53.jpg',
//         comments: [],
//       },
//       {
//         title: 'post 2-3',
//         uri: 'https://bafybeigy55sofjcicr7oojtwqzri63jt76jh5iignhtlahdnzfzoljhrx4.ipfs.w3s.link/ipfs/bafybeigy55sofjcicr7oojtwqzri63jt76jh5iignhtlahdnzfzoljhrx4/photo_2022-09-17_20-31-29.jpg',
//         comments: [],
//         bounty: '1 ETH',
//       },
//       {
//         title: 'post 2-4',
//         uri: 'https://bafybeia6aszsp746yanbk5oamkxjklinhtggtre4mdlxa3vpjhquklprci.ipfs.w3s.link/ipfs/bafybeia6aszsp746yanbk5oamkxjklinhtggtre4mdlxa3vpjhquklprci/photo_2022-09-17_20-31-40.jpg',
//         comments: [],
//       },
//     ],
//   },
//   {
//     name: 'tag3',
//     posts: [
//       {
//         title: 'post 3-1',
//         uri: 'https://bafybeifppo2nzan32hmmrmfehpjhf6cfkpwtql5r72ptuhhrsgadepiwwq.ipfs.w3s.link/QmcTNiCQxWeffQSEekJkUhJU61qPe7VjFKZzZExCGZJCxd.jpeg',
//         comments: [],
//       },
//       {
//         title: 'post 3-2',
//         uri: 'https://bafybeihmbmnnomvdhv4kxtnkhnoxugnbilifc32ra4ujb3id5i25ybvgxy.ipfs.w3s.link/ipfs/bafybeihmbmnnomvdhv4kxtnkhnoxugnbilifc32ra4ujb3id5i25ybvgxy/photo_2022-09-17_20-31-49.jpg',
//         comments: [],
//       },
//       {
//         title: 'post 3-3',
//         uri: 'https://bafybeib5jy6gutzqz7skxkeknbp6roqj2f7qymzs4s7jvqvmsydg6gwhki.ipfs.w3s.link/ipfs/bafybeib5jy6gutzqz7skxkeknbp6roqj2f7qymzs4s7jvqvmsydg6gwhki/photo_2022-09-17_20-31-39.jpg',
//         comments: [],
//       },
//       {
//         title: 'post 3-4',
//         uri: 'https://bafybeidbwqnjr4xk5e6ldznwbqzf4gktyr6opay7u5ljsognzxxykxf7o4.ipfs.w3s.link/ipfs/bafybeidbwqnjr4xk5e6ldznwbqzf4gktyr6opay7u5ljsognzxxykxf7o4/photo_2022-09-17_20-31-35.jpg',
//         comments: [],
//         bounty: '0.25 ETH',
//       },
//       {
//         title: 'post 3-5',
//         uri: 'https://bafybeigjwp53x6456esp3e4yxyceru6a7nygm6bzkpx6umvtgpzzdff4vy.ipfs.w3s.link/ipfs/bafybeigjwp53x6456esp3e4yxyceru6a7nygm6bzkpx6umvtgpzzdff4vy/photo_2022-09-17_20-31-38.jpg',
//         comments: [],
//         bounty: '0.25 ETH',
//       },
//     ],
//   },
//   {
//     name: 'tag4',
//     posts: [
//       {
//         title: 'post 3-1',
//         uri: 'https://bafybeig37b4iz6tymaeyk5qmet3t3s7w2a42plbpwrgtvpjwja3p4ep734.ipfs.w3s.link/ipfs/bafybeig37b4iz6tymaeyk5qmet3t3s7w2a42plbpwrgtvpjwja3p4ep734/photo_2022-09-17_20-31-50.jpg',
//         comments: [],
//       },
//       {
//         title: 'post 3-2',
//         uri: 'https://bafybeiffqamc6gozfjwhspchrveqykfntcqktyniuqhvbngmqr2p4efcbi.ipfs.w3s.link/ipfs/bafybeiffqamc6gozfjwhspchrveqykfntcqktyniuqhvbngmqr2p4efcbi/photo_2022-09-17_20-31-43.jpg',
//         comments: [],
//       },
//       {
//         title: 'post 3-3',
//         uri: 'https://bafybeid5mxferoxh6xdami6sila5nq62eyxskxzemlm66vjxu4ssw36jge.ipfs.w3s.link/ipfs/bafybeid5mxferoxh6xdami6sila5nq62eyxskxzemlm66vjxu4ssw36jge/photo_2022-09-17_20-31-56.jpg',
//         comments: [],
//         bounty: '0.01 ETH',
//       },
//       {
//         title: 'post 3-4',
//         uri: 'https://bafybeif7adheffynhmrmfuymtrcmt7q6y72coctqjmi7vxuhfezeyurmei.ipfs.w3s.link/ipfs/bafybeif7adheffynhmrmfuymtrcmt7q6y72coctqjmi7vxuhfezeyurmei/photo_2022-09-17_20-31-55.jpg',
//         comments: [],
//       },
//     ],
//   },
// ];

export default function Feed({ localProvider, lensContracts, address, price, gasPrice }) {
  const [selectedTagName, setSelectedTagName] = useState(TAGS_DUMMY_DATA[0].name);

  if (!address) {
    return (
      <Row gutter={[16, 24]} className="py-4">
        <Col className="gutter-row text-center" xs={24}>
          <h1 className="text-xl tracking-tight text-gray-900 dark:text-white">Please connect you wallet</h1>
        </Col>
      </Row>
    );
  }

  return (
    <Row gutter={[16, 24]} className="py-4">
      <Col className="gutter-row" xs={24}>
        {TAGS_DUMMY_DATA.map(tag => {
          if (tag.name === selectedTagName) {
            return (
              <button
                onClick={() => setSelectedTagName(tag.name)}
                className="inline-flex items-center px-3 py-1 rounded-full bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-white"
              >
                <span className="relative">{tag.name}</span>
              </button>
            );
          }
          return (
            <button
              onClick={() => setSelectedTagName(tag.name)}
              className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-white"
            >
              <span className="relative">{tag.name}</span>
            </button>
          );
        })}
      </Col>

      {TAGS_DUMMY_DATA.map(tag => {
        const { name, posts } = tag;
        if (name !== selectedTagName) return <></>;
        return (
          <>
            {posts.map(post => {
              const { title, uri, comments, bounty } = post;
              return (
                <>
                  <Col className="gutter-row" md={6} xs={24} />
                  <Col className="gutter-row" md={12} xs={24}>
                    <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="w-full text-black dark:text-white">
                        <DarkContainer className="mb-2 float-right w-full">
                          <div className="flex justify-center text-lg mb-4">{title}</div>
                          <img
                            src={uri}
                            alt={title}
                            style={{
                              display: 'block',
                              marginLeft: 'auto',
                              marginRight: 'auto',
                            }}
                          />
                          {bounty && (
                            <div
                              onClick={() => setSelectedTagName(tag.name)}
                              className="float-right px-3 py-1 mt-4 rounded-full bg-green-100 text-green-800 dark:bg-green-600 dark:text-white"
                            >
                              <span className="relative">{bounty}</span>
                            </div>
                          )}
                        </DarkContainer>
                        {comments.length > 0 && (
                          <Collapse defaultActiveKey={['1']} className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
                            <Panel header="Show Comments" key="1">
                              {comments.map(comment => {
                                return (
                                  <DarkContainer className="dark:text-white dark:bg-gray-800 mb-1">
                                    <p className="w-full text-black dark:text-white">{comment.text}</p>
                                  </DarkContainer>
                                );
                              })}
                            </Panel>
                          </Collapse>
                        )}
                        <Button color="lightblue">
                          share <ShareIcon className="float-right h-4 w-4" />
                        </Button>
                        <div
                          className="flex content-center"
                          styles={{ alignItems: 'center', justifyContent: 'center' }}
                        ></div>
                      </div>
                    </div>
                  </Col>
                  <Col className="gutter-row" md={6} xs={24} />
                </>
              );
            })}
          </>
        );
      })}
    </Row>
  );
}
