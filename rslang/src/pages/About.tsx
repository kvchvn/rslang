import React from 'react';
import Footer from '../components/Footer';
import teamCard from '../components/TeamCard';

export default function About() {
  const classnames = {
    main: 'page about-page about',
    wrapper: 'wrapper about-page__wrapper',
    title: 'page__title about-page__title',
    introBox: 'about-page__intro-box',
    intro: 'about-page__intro',
    introLink: 'link about-page__link about-page__intro-link',
    teamTitle: 'about-page__team-title',
    teamList: 'about-page__team-list',
  };

  const hrefs = {
    introLinkRS: 'https://rs.school/js/',
    introLinkTelegram: 'https://t.me/tonyura/',
  };

  const users = [
    {
      name: 'Антон',
      location: 'Островец, Беларусь',
      contribution: 'Мини-игра "Спринт", словарь, страница статистики',
      gitHubLink: 'https://github.com/urozhai',
      avatarClassName: 'team__card__main_avatar_1',
      style: "backgroundSize: 'cover'",
    },
    {
      name: 'Дмитрий',
      location: 'Минск, Беларусь',
      contribution: 'Мини-игра "Аудиовызов", авторизация',
      gitHubLink: 'https://github.com/Dmitrii23748',
      avatarClassName: 'team__card__main_avatar_2',
    },
    {
      name: 'Вячеслав',
      location: 'Минск, Беларусь',
      contribution: 'Главная страница',
      gitHubLink: 'https://github.com/ExxZzyy',
      avatarClassName: 'team__card__main_avatar_3',
    },
  ];

  return (
    <>
      <main className={classnames.main}>
        <div className={classnames.wrapper}>
          <h2 className={classnames.title}>О нас</h2>
          <div className={classnames.introBox}>
            <p className={classnames.intro}>
              Мы команда начинающих программистов, заканчивающих курс по программированию от
              <a className={classnames.introLink} href={hrefs.introLinkRS}>
                The Rolling Scopes School
              </a>
              .
            </p>
            <p>
              Данное приложение выполнено в рамках финального задания на курсе. Оно также несет в
              себе цель помочь вам в изучении английского языка. В словаре собраны 3600 наиболее
              употребляемых слов. Слова разбиты на 6 групп в порядке возрастания сложности. Каждое
              слово вы можете отметить как сложное либо изученное. Сложные слова располагаются в
              отдельной группе.
            </p>
            <p>
              Для облегчения процесса обучения можно воспользоваться мини-играми Спринт и
              Аудиовызов. Ваши результаты будут сохраняться в разделе статистики.
            </p>
            <p>
              Пожалуйста, при нахождении багов, напишите нам в
              <a className={classnames.introLink} href={hrefs.introLinkTelegram}>
                telegram
              </a>
              .
            </p>
          </div>
          <h4 className={classnames.teamTitle}>Команда разработчиков</h4>
          <ul className={classnames.teamList}>
            {users.map((user, index) => teamCard({ user, index }))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
