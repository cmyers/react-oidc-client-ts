import * as React from 'react';

export interface IHeaderProps {
  pageTitle: string;
  logoSrc: any;
}

const Header: React.FC<IHeaderProps> = (props) => {
  return (
    <header className="App-header">
      <img src={props.logoSrc} className="App-logo" alt="logo" />
      <h1 className="App-title">{props.pageTitle}</h1>
    </header>
  );
}

export default Header;