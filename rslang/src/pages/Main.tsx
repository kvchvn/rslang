import React from 'react';
import Footer from '../components/Footer';
import '../styles/mainPage.css';

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
        <div className="team__cards">
          <div className="team__card">
            <div className="team__card__main">
              Антон
              <div className="team__card__main__info">Front-end Developer Минск, Беларусь</div>
              <div className="team__card__main__avatar">
                <div
                  className="team__card__main_avatar_1 avatar__frame"
                  style={{ backgroundSize: 'cover' }}
                />
              </div>
            </div>
            <div className="team__card__info">
              <div className="team__card__info_contribution">
                Вклад в разработку: Мини-игра &quot;Спринт&quot;
              </div>
              <div className="team__card__info__contacts">
                <a href="https://github.com/urozhai">
                  <div className="git__icon" />
                </a>
              </div>
            </div>
          </div>
          <div className="team__card">
            <div className="team__card__main">
              Дмитрий
              <div className="team__card__main__info">Front-end Developer Минск, Беларусь</div>
              <div className="team__card__main__avatar">
                <div className="team__card__main_avatar_2 avatar__frame" />
              </div>
            </div>
            <div className="team__card__info">
              <div className="team__card__info_contribution">
                Вклад в разработку: Мини-игра &quot;Аудиовызов&quot;
              </div>
              <div className="team__card__info__contacts">
                <a href="https://github.com/Dmitrii23748">
                  <div className="git__icon" />
                </a>
              </div>
            </div>
          </div>
          <div className="team__card">
            <div className="team__card__main">
              Вячеслав
              <div className="team__card__main__info">Front-end Developer Минск, Беларусь</div>
              <div className="team__card__main__avatar">
                <div className="team__card__main_avatar_3 avatar__frame" />
              </div>
            </div>
            <div className="team__card__info">
              <div className="team__card__info_contribution">
                Вклад в разработку: Главная страница
              </div>
              <div className="team__card__info__contacts">
                <a href="https://github.com/ExxZzyy">
                  <div className="git__icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
