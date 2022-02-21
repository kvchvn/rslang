import React from 'react';
import '../styles/footer.css';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__text">Онлайн курс RS-SCHOOL 2022</div>
      <div className="footer__rs-logo">
        <a href="https://rs.school/js/">
          <div className="footer__rs-logo-img" />
        </a>
      </div>
      <div className="footer__authors">
        <ul className="footer__links">
          <li>
            <a href="https://github.com/ExxZzyy">ExZzy</a>
          </li>
          <li>
            <a href="https://github.com/urozhai">
              <div className="footer__github-logo" />
              urozhai
            </a>
          </li>
          <li>
            <a href="https://github.com/Dmitrii23748">
              <div className="footer__github-logo" />
              Dmitrii23748
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
