import React from 'react';
import { IChildren } from '../../services/interfaces';

export default function PageTemplate({ children }: IChildren) {
  const classnames = {
    main: 'page sprints-page sprint',
    wrapper: 'wrapper sprint-wrapper',
    mainTitle: 'page__title sprint-page__title',
    mainSection: 'page__main-content sprint-page__main-content',
  };

  return (
    <main className={classnames.main}>
      <div className={classnames.wrapper}>
        <h2 className={classnames.mainTitle}>Спринт</h2>
        <section className={classnames.mainSection}>{children}</section>
      </div>
    </main>
  );
}
