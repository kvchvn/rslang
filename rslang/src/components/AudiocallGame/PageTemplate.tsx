import React from 'react';
import { IChildren } from '../../services/interfaces';

export default function PageTemplate({ children }: IChildren) {
  const classnames = {
    main: 'page audiocall-page audiocall',
    wrapper: 'wrapper audiocall__wrapper',
    mainTitle: 'page__title audiocall-page__title',
    mainSection: 'page__main-content audiocall-page__main-content',
  };

  return (
    <main className={classnames.main}>
      <div className={classnames.wrapper}>
        <h2 className={classnames.mainTitle}>Аудиовызов</h2>
        <section className={classnames.mainSection}>{children}</section>
      </div>
    </main>
  );
}
