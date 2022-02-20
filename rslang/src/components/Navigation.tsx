import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const hideClassname = 'hide';
  const classnames = {
    navBox: 'menu-box__navbar navbar',
    linksList: 'navbar__links-list',
    linkItem: 'navbar__link-item',
    buttonSwitch: `button navbar__button__switch ${hideClassname}`,
    link: 'link navbar__link',
  };

  const switchMenu = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    target.classList.toggle(hideClassname);
  };

  const hideMenu = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const linksList = target.closest(`.${classnames.linksList}`);
    if (linksList) {
      const buttonSwitch = document.querySelector(`.navbar__button__switch`);
      if (buttonSwitch) {
        buttonSwitch.classList.add(`${hideClassname}`);
      }
    }
  };

  return (
    <nav className={classnames.navBox}>
      <button type="button" className={classnames.buttonSwitch} onClick={(e) => switchMenu(e)} />
      <ul className={classnames.linksList} onClick={(e) => hideMenu(e)}>
        <li className={classnames.linkItem}>
          <Link to="/" className={classnames.link}>
            Главная
          </Link>
        </li>
        <li className={classnames.linkItem}>
          <Link to="/textbook" className={classnames.link}>
            Учебник
          </Link>
        </li>
        <li className={classnames.linkItem}>
          <Link to="/sprint" className={classnames.link}>
            Спринт
          </Link>
        </li>
        <li className={classnames.linkItem}>
          <Link to="/audiocall" className={classnames.link}>
            Аудиовызов
          </Link>
        </li>
        <li className={classnames.linkItem}>
          <Link to="/statistics" className={classnames.link}>
            Статистика
          </Link>
        </li>
        <li className={classnames.linkItem}>
          <Link to="/about" className={classnames.link}>
            О нас
          </Link>
        </li>
      </ul>
    </nav>
  );
}
