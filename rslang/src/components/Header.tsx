import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

export default function Header() {
  const classnames = {
    header: 'header',
    wrapper: 'wrapper header__wrapper',
    menuBox: 'header__menu-box menu-box',
    title: 'header__title',
    link: 'link header__link',
    authorization: 'link header__link link_authorization',
  };

  return (
    <header className={classnames.header}>
      <div className={classnames.wrapper}>
        <div className={classnames.menuBox}>
          <Navigation />
          <h2 className={classnames.title}>
            <Link to="/" className={classnames.link}>
              RS Lang
            </Link>
          </h2>
        </div>
        <Link to="/authorization" className={classnames.authorization} />
      </div>
    </header>
  );
}
