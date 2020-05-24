import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import { Menu } from 'antd';

import './header.css';

const Header = ({ siteTitle }) => (
  <Menu
    mode="horizontal"
    theme="dark"
  >
    <Menu.Item key={0}>
      <Link
        to="/"
        className="header-title"
      >
        <span className="header-majuscule">e</span>xamples.<span className="header-majuscule">g</span>ratis
      </Link>
    </Menu.Item>

  </Menu>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
