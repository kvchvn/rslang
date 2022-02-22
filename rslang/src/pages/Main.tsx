import React from 'react';
import Footer from '../components/Footer';

export default function Main() {
  const classnames = {
    main: 'page main-page main',
    wrapper: 'wrapper main-page__wrapper',
    mainContent: 'main-page__main-content',
    image: 'main-page__image',
    title: 'main-page__title',
    textContent: 'main-page__text-content',
  };

  return (
    <main className={classnames.main}>
      <div className={classnames.wrapper}>
        <div className={classnames.mainContent}>
          <span className={classnames.image} />
          <div className={classnames.textContent}>
            <h2 className={classnames.title}>Учить английский - легко</h2>
            <p>
              RS Lang - Уникальное приложение для изучения английского. Вас ждут увлекательные игры
              для тренировки слов и метод интервального повторения для лучшего запоминания слов.
            </p>
            <p>
              Возможность выбора уровня сложности, статистика прогресса. Вне зависимости от того,
              играете ли вы или тренируете слова - статистика по изученным словам обновляется и
              всегда доступна.
            </p>
            <p>Аудиовызов, игра, которая улучшает восприятие английской речи на слух.</p>
            <p>
              Игра Спринт - учит быстро переводить с английского на русский язык. Для этой
              тренировки используются слова из вашего словаря.
            </p>
            <p>
              Всё это доступно Вам 24/7 из любой точки мира с компьютера, планшета или смартфона
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
