import React from 'react';
import Footer from '../components/Footer';
import '../styles/mainPage.css';
import teamCard from '../components/teamCard';

const users = [
  {
    name: 'Антон',
    location: 'Front-end Developer Островец, Беларусь',
    contribution: 'Мини-игра "Спринт", словарь, страница статистики',
    gitHubLink: 'https://github.com/urozhai',
    avatarClassName: 'team__card__main_avatar_1',
    style: "backgroundSize: 'cover'",
  },
  {
    name: 'Дмитрий',
    location: 'Front-end Developer Минск, Беларусь',
    contribution: 'Мини-игра "Аудиовызов", авторизация',
    gitHubLink: 'https://github.com/Dmitrii23748',
    avatarClassName: 'team__card__main_avatar_2',
  },
  {
    name: 'Вячеслав',
    location: 'Front-end Developer Минск, Беларусь',
    contribution: 'Главная страница',
    gitHubLink: 'https://github.com/ExxZzyy',
    avatarClassName: 'team__card__main_avatar_3',
  },
];

export default function Main() {
  return (
    <div>
      <div className="main zerogrid">
        <div className="row">
          <div className="left__column">
            <img src="eng.jpg" alt="English" className="img" />
          </div>
          <div className="right__column">
            <div className="right__column__text">
              <h1>Учить анлглийский - легко</h1>
              <p>
                RS Lang - Уникальное приложение для изучения английского. Вас ждут увлекательные
                игры для тренировки слов и метод интервального повторения для лучшего запоминания
                слов.
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
      </div>
      <div className="team__wrapper">
        <div className="team__title">Команда разработчиков:</div>
        <div className="team__cards">{users.map((user) => teamCard(user))}</div>
      </div>
      <Footer />
    </div>
  );
}
