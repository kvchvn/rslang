import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav>
      <Link to="/">Main</Link>
      <Link to="/authorization">Authorization</Link>
      <Link to="/textbook">Textbook</Link>
      <Link to="/sprint">Sprint</Link>
      <Link to="/audiocall">Audio Call</Link>
      <Link to="/statistics">Statistics</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}
