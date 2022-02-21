import React from 'react';
import '../styles/mainPage.css';

interface usersData {
  name: string;
  location: string;
  contribution: string;
  gitHubLink: string;
  avatarClassName: string;
}

export default function teamCard(props: usersData) {
  return (
    <div className="team__card">
      <div className="team__card__main">
        {props.name}
        <div className="team__card__main__info">{props.location}</div>
        <div className="team__card__main__avatar">
          <div
            className={'avatar__frame ' + props.avatarClassName}
            style={{ backgroundSize: 'cover' }}
          />
        </div>
      </div>
      <div className="team__card__info">
        <div className="team__card__info_contribution">
          Вклад в разработку: {props.contribution}
        </div>
        <div className="team__card__info__contacts">
          <a href={props.gitHubLink}>
            <div className="git__icon" />
          </a>
        </div>
      </div>
    </div>
  );
}
