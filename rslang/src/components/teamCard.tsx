import React from 'react';
import '../styles/mainPage.css';

interface usersData {
  name: string;
  location: string;
  contribution: string;
  gitHubLink: string;
  avatarClassName: string;
}

export default function TeamCard({ user, index }: { user: usersData; index: number }) {
  return (
    <li key={index} className="team-card">
      <span className="team-card__avatar" />
      <div className="team-card__info">
        <div className="team-card__name-box">
          <h5 className="team-card__name">{user.name}</h5>
          <a className="link team-card__link" href={user.gitHubLink}>
            <span className="team-card__github-icon" />
          </a>
        </div>
        <p className="team-card__location">{user.location}</p>
        <p className="team-card__contribution">Вклад в разработку: {user.contribution}</p>
      </div>
    </li>
  );
}
