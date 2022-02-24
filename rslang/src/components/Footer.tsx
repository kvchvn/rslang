import React from 'react';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrapper footer__wrapper">
        <a className="link footer__link footer__link_rsschool" href="https://rs.school/js/">
          <span className="footer__link-background footer__link-background_rsschool" />
        </a>
        <p className="footer__year">2022</p>
        <div className="footer__command">
          <ul className="footer__command_github-links">
            <li>
              <a
                className="link footer__link footer__link_command-github"
                href="https://github.com/ExxZzyy"
              >
                ExZzy
              </a>
            </li>
            <li>
              <a
                className="link footer__link footer__link_command-github"
                href="https://github.com/urozhai"
              >
                urozhai
              </a>
            </li>
            <li>
              <a
                className="link footer__link footer__link_command-github"
                href="https://github.com/Dmitrii23748"
              >
                Dmitrii23748
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
