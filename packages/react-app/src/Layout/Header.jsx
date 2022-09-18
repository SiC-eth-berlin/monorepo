import React from 'react';
//import Logo from '/logo.svg';

export default function Header({ link, title, subTitle }) {
  return (
    <div>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src="/logo.svg" className="w-14 h-14 mt-2" alt="image" />
      </a>
      <p className="text-lg font-normal italic text-gray-500 dark:text-slate-100 tracking-wide">{subTitle}</p>
    </div>
  );
}

Header.defaultProps = {
  link: 'https://github.com/SiC-eth-berlin/monorepo',
  title: 'SiC',
  subTitle: '',
};
