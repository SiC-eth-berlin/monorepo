import React from 'react';

export default function Header({ link, title, subTitle }) {
  return (
    <div>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h2>
      </a>
      <p className="text-lg font-normal italic text-gray-500 dark:text-slate-100 tracking-wide">{subTitle}</p>
    </div>
  );
}

Header.defaultProps = {
  link: 'https://github.com/SiC-eth-berlin/monorepo',
  title: 'SiC',
  subTitle: 'ETH-Berlin',
};
