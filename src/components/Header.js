import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <header>
    LUGAR LIVRE
    <ul>
      <li>
        <Link to="/">normal screen</Link>
      </li>
      <li>
        <Link to="/accept">accept screen</Link>
      </li>
      <li>
        <Link to="/refuse">refuse screen</Link>
      </li>
    </ul>
  </header>
);

export default Header;